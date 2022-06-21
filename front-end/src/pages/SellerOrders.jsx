import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';
import { setData } from '../services/request';

const SellerOrders = () => {
  const [sellerOrders, setSellerOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      const { id, token } = JSON.parse(localStorage.getItem('user'));
      const orders = await setData(token, '/sales/seller/', { id });
      setSellerOrders(orders);
    }
    getOrders();
  }, []);

  return (
    <section>
      <Navbar />
      {
        sellerOrders.map(({ id, status, totalPrice, saleDate }) => (<OrderCard
          key={ id }
          id={ id }
          status={ status }
          totalPrice={ totalPrice }
          saleDate={ saleDate }
          isSeller
        />))
      }
    </section>
  );
};

export default SellerOrders;
