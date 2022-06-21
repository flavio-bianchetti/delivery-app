import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SellerOrderCard from '../components/SellerOrderCard';
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
        sellerOrders.map((sale) => (<SellerOrderCard
          key={ sale.id }
          sale={ sale }
        />))
      }
    </section>
  );
};

export default SellerOrders;
