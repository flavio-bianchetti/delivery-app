import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { requestData } from '../services/request';
import TableDetails from '../components/TableDetails';

const OrdersDetails = () => {
  const [saleProducts, setSaleProducts] = useState([]);
  const [userOrder, setUserOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState('0,00');
  const [sellerName, setSellerName] = useState('');

  const dtStatus = 'customer_order_details__element-order-details-label-delivery-status';

  const { id } = useParams();

  useEffect(() => {
    async function getProducts() {
      const { token } = JSON.parse(localStorage.getItem('user'));
      const order = await requestData(token, `/sales/${id}`);
      console.log(order);
      if (order.sellerId) {
        console.log(order.sellerId);
        const seller = await requestData(token, `/users/${order.sellerId}`);
        console.log(seller);
        const { name } = seller;
        console.log(name);
        setUserOrder(order);
        setSaleProducts(order.Products);
        setTotalPrice(order.totalPrice);
        setSellerName(name);
      }
    }
    getProducts();
  }, [id]);
  return (
    <section>
      <Navbar />
      <div>
        <div>
          <div
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            { `Pedido ${userOrder.id}` }
          </div>
          <div
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            {`P.Vend: ${sellerName}`}
          </div>
          <div
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            { ` ${new Date(`${userOrder.saleDate}`).toLocaleDateString()} ` }
          </div>
          <div
            data-testid={ dtStatus }
          >
            { userOrder.status }
          </div>
          <button
            type="button"
            disabled
            data-testid="customer_order_details__button-delivery-check"
          >
            MARCAR COMO ENTREGUE
          </button>
        </div>
        <TableDetails products={ saleProducts } />
        <div>
          <span>Total: R$ </span>
          <span data-testid="customer_order_details__element-order-total-price">
            {totalPrice.replace('.', ',')}
          </span>
        </div>
      </div>
    </section>
  );
};

export default OrdersDetails;
