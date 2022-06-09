import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';
import { requestData } from '../services/request';

const Orders = () => {
  const [userOrder, setUserOrder] = useState([]);

  useEffect(() => {
    async function getOrders() {
      const { id, token } = JSON.parse(localStorage.getItem('user'));
      const orders = await requestData(token, `/sales/user/${id}`);
      setUserOrder(orders);
    }
    getOrders();
  }, []);

  return (
    <section>
      <Navbar />
      {
        userOrder.map(({ id, status, totalPrice, saleDate }) => (<OrderCard
          key={ id }
          id={ id }
          status={ status }
          totalPrice={ totalPrice }
          saleDate={ saleDate }
        />))
      }
    </section>
  );
};

export default Orders;
