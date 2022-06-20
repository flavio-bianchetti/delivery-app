import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';
import { setData } from '../services/request';

function AdressForm() {
  const [sellerList, setSellerList] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState();
  const [deliveryNumber, setDeliveryNumber] = useState();
  const [sellerSelected, setSellerSelected] = useState('');

  const navigate = useNavigate();

  const {
    userToken,
    productsList,
    totalCart,
  } = useContext(DeliveryContext);

  async function submitSale() {
    const sellerId = Number(sellerSelected);
    const { id, token } = JSON.parse(localStorage.getItem('user'));
    const saleProducts = productsList
      .filter((product) => product.quantity > 0)
      .map((p) => ({ product: p.name, quantity: p.quantity }));

    const totalPrice = Number(totalCart.replace(',', '.'));

    const body = {
      userId: id,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleProducts,
    };

    const { id: orderId } = await setData(userToken, '/sales', body);
    
    // const saleId = await setData(userToken, '/sales', body);
    navigate('/customer/orders');
  }

  useEffect(() => {
    async function getSeller() {
      const list = await setData(userToken, '/users', { role: 'seller' });
      setSellerList(list);
      setSellerSelected(list[0].id);
    }
    getSeller();
  }, [userToken]);

  return (
    <>
      <h2>Detalhes e Endereço para Entrega</h2>
      <form>
        <select
          name="option"
          id="teste"
          data-testid="customer_checkout__select-seller"
          value={ sellerSelected }
          onClick={ (e) => {
            setSellerSelected(e.target.value);
          } }
        >
          {sellerList.map(
            (seller) => (
              <option
                value={ seller.id }
                key={ seller.id }
              >
                {seller.name}
              </option>
            ),
          ) }
        </select>
        <input
          type="text"
          data-testid="customer_checkout__input-address"
          value={ deliveryAddress }
          onChange={ (e) => setDeliveryAddress(e.target.value) }
        />
        <input
          type="number"
          data-testid="customer_checkout__input-addressNumber"
          value={ deliveryNumber }
          onChange={ (e) => setDeliveryNumber(e.target.value) }
        />
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ () => submitSale() }
        >
          Finalizar Pedido
        </button>
      </form>
    </>
  );
}

export default AdressForm;
