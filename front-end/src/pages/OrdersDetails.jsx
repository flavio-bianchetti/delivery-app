import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Stack, Grid, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import { requestData, updateData } from '../services/request';
import TableDetails from '../components/TableDetails';
import DeliveryContext from '../context/DeliveryContext';
import Button from '../components/Button';

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

  const detailsBar = () => (
    <Grid
      container
      direction="row"
      paddingBottom={ 2 }
      spacing={ 1 }
    >
      <Grid
        item
        xs={ 2 }
        data-testid={
          `${userRole}_order_details__element-order-details-label-order-id`
        }
      >
        <Stack
          color="white"
          backgroundColor="green"
          borderRadius={ 1 }
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          { `Pedido nº ${userOrder.id}` }
        </Stack>
      </Grid>
      {
        userRole === 'customer' && (
          <Grid
            item
            xs={ 2 }
            data-testid={
              `${userRole}_order_details__element-order-details-label-seller-name`
            }
          >
            <Stack
              color="white"
              backgroundColor="green"
              borderRadius={ 1 }
              width="100%"
              height="100%"
              alignItems="center"
              justifyContent="center"
            >

              { `Vend.: ${sellerName}` }
            </Stack>
          </Grid>
        )
      }
      <Grid
        item
        xs={ 2 }
        data-testid={
          `${userRole}_order_details__element-order-details-label-order-date`
        }
      >
        <Stack
          color="white"
          backgroundColor="green"
          borderRadius={ 1 }
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          {
            `${new Date(`${userOrder.saleDate}`).toLocaleDateString(
              'pt-BR',
            )}`
          }
        </Stack>
      </Grid>
      <Grid
        item
        xs={ 2 }
        data-testid={
          `${userRole}_order_details__element-order-details-label-delivery-status`
        }
      >
        <Stack
          color="white"
          backgroundColor="red"
          borderRadius={ 1 }
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          { `Separação: ${orderStatus}` }
        </Stack>
      </Grid>
      {
        userRole === 'customer'
          ? (
            <Grid
              item
              xs={ 4 }
            >
              <Button
                className="btn-finalizar"
                type="button"
                variant="contained"
                label="MARCAR COMO ENTREGUE"
                data-testid="customer_order_details__button-delivery-check"
                onClick={ () => true }
                disabled
              />
            </Grid>
          )
          : (
            <Grid
              item
              xs={ 4 }
            >
              <Button
                className="btn-finalizar"
                type="button"
                variant="contained"
                id="Preparando"
                label="PREPARAR PEDIDO"
                data-testid="seller_order_details__button-preparing-check"
                onClick={ (event) => handleClick(event) }
                disabled={ orderStatus !== 'Pendente' }
              />
              <Button
                className="btn-finalizar"
                type="button"
                variant="contained"
                id="Em Trânsito"
                label="SAIU PARA ENTREGA"
                data-testid="seller_order_details__button-dispatch-check"
                onClick={ (event) => handleClick(event) }
                disabled={ orderStatus !== 'Preparando' }
              />
            </Grid>
          )
      }
    </Grid>
  );

  return (
    <section>
      <Navbar />
      <Stack
        padding={ 1 }
      >
        <Typography
          color="green"
          variant="h4"
          component="div"
          align="center"
          spacing={ 1 }
        >
          Detalhes do Pedido
        </Typography>
      </Stack>
      <Box
        display="flex"
        component="div"
        padding={ 2 }
      >
        <Stack
          sx={ { width: '100%' } }
          direction="column"
          paddingBottom={ 2 }
        >
          { detailsBar() }
          <TableDetails products={ saleProducts } userRole={ userRole } />
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Grid
              data-testid={ `${userRole}_order_details__element-order-total-price` }
              backgroundColor="green"
              color="white"
              padding={ 2 }
              paddingLeft={ 4 }
              paddingRight={ 4 }
            >
              { `Total: R$ ${totalPrice.replace('.', ',')}` }
            </Grid>
          </Box>
        </Stack>
      </Box>
    </section>
  );
};

export default OrdersDetails;
