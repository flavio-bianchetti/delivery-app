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
      console.log(orders);
      setUserOrder(orders);
    }
    getOrders();
  }, []);

  return (
    <section>
      <Navbar />
      {
        userOrder.map((sale) => (<OrderCard
          key={ sale.id }
          sale={ sale }
        />))
      }
    </section>
  );
};

export default Orders;
