import React, { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
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
      <Box>
        <Stack
          display="flex"
          alignItems="center"
          justifyContent="center"
          direction="row"
          flexWrap="wrap"
        >
          {
            userOrder.map((sale) => (
              <Stack
                key={ sale.id }
                spacing={ 1 }
                padding={ 1 }
              >
                <OrderCard
                  sale={ sale }
                />

              </Stack>
            ))
          }
        </Stack>
      </Box>
    </section>
  );
};

export default Orders;
