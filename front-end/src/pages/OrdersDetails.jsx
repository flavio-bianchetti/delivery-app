import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { requestData, updateData } from '../services/request';
import TableDetails from '../components/TableDetails';
import DeliveryContext from '../context/DeliveryContext';

const OrdersDetails = () => {
  const {
    userToken,
    userRole,
  } = useContext(DeliveryContext);

  const [saleProducts, setSaleProducts] = useState([]);
  const [userOrder, setUserOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState('0,00');
  const [sellerName, setSellerName] = useState('');
  const [orderStatus, setOrderStatus] = useState('');

  const { id } = useParams();

  useEffect(() => {
    async function getProducts() {
      const order = await requestData(userToken, `/sales/${id}`);
      if (order.sellerId) {
        const seller = await requestData(userToken, `/users/${order.sellerId}`);
        const { name } = seller;
        setUserOrder(order);
        setSaleProducts(order.Products);
        setTotalPrice(order.totalPrice);
        setOrderStatus(order.status);
        setSellerName(name);
      }
    }
    getProducts();
  }, [id, userToken]);

  const handleClick = async (event) => {
    const { id: status } = event.target;
    const body = {
      status,
    };
    const updatedOrder = await updateData(userToken, `/sales/${id}`, body);
    if (updatedOrder) {
      setOrderStatus(status);
    }
  };

  return (
    <section>
      <Navbar />
      <div>
        <div>
          <div
            data-testid={
              `${userRole}_order_details__element-order-details-label-order-id`
            }
          >
            { `Pedido ${userOrder.id}` }
          </div>
          {
            userRole === 'customer' && (
              <div
                data-testid={
                  `${userRole}_order_details__element-order-details-label-seller-name`
                }
              >
                { `P.Vend: ${sellerName}` }
              </div>
            )
          }
          <div
            data-testid={
              `${userRole}_order_details__element-order-details-label-order-date`
            }
          >
            {
              `${new Date(`${userOrder.saleDate}`).toLocaleDateString(
                'pt-BR',
              )}`
            }
          </div>
          <div
            data-testid={
              `${userRole}_order_details__element-order-details-label-delivery-status`
            }
          >
            { orderStatus }
          </div>
          {
            userRole === 'customer'
              ? (
                <button
                  type="button"
                  disabled
                  data-testid="customer_order_details__button-delivery-check"
                >
                  MARCAR COMO ENTREGUE
                </button>
              )
              : (
                <div>
                  <button
                    type="button"
                    id="Preparando"
                    disabled={ orderStatus !== 'Pendente' }
                    onClick={ (event) => handleClick(event) }
                    data-testid="seller_order_details__button-preparing-check"
                  >
                    PREPARAR PEDIDO
                  </button>
                  <button
                    type="button"
                    id="Em Trânsito"
                    disabled={ orderStatus !== 'Preparando' }
                    onClick={ (event) => handleClick(event) }
                    data-testid="seller_order_details__button-dispatch-check"
                  >
                    SAIU PARA ENTREGA
                  </button>
                </div>
              )
          }
        </div>
        <TableDetails products={ saleProducts } userRole={ userRole } />
        <div>
          <span>Total: R$ </span>
          <span data-testid={ `${userRole}_order_details__element-order-total-price` }>
            {totalPrice.replace('.', ',')}
          </span>
        </div>
      </div>
    </section>
  );
};

export default OrdersDetails;
