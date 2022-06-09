import React, { useContext, useEffect, useState } from 'react';
import DeliveryContext from '../context/DeliveryContext';
import { setData } from '../services/request';

function AdressForm() {
  const [sellerList, setSellerList] = useState([]);
  const { userToken } = useContext(DeliveryContext);
  const body = { role: 'seller' };

  useEffect(() => {
    async function getSeller() {
      const list = await setData(userToken, '/users', body);
      console.log(list);
      setSellerList(list);
    }
    getSeller();
  }, []);

  return (
    <>
      <h2>Detalhes e Endereço para Entrega</h2>
      <form>
        <select name="option" id="teste" data-testid="customer_checkout__select-seller">
          {sellerList.map(
            (seller) => (<option key={ seller.id }>{seller.name}</option>),
          ) }
        </select>
        <input type="text" data-testid="customer_checkout__input-address" />
        <input type="number" data-testid="customer_checkout__input-addressNumber" />
        <button type="button" data-testid="customer_checkout__button-submit-order">
          Finalizar Pedido
        </button>
      </form>
    </>
  );
}

export default AdressForm;
