import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Stack, Box, Typography } from '@mui/material';

const OrderCard = ({ sale }) => {
  const { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber } = sale;
  const cleanedDate = moment(Date.parse(saleDate)).format('DD/MM/YYYY');
  const cleanedPrice = totalPrice.replace('.', ',');

  const navigate = useNavigate();

  return (
    <Box
      display="flex"
    >
      <Stack
        width="320px"
        height="120px"
        margin={ 1 }
        border="2px solid green"
        borderRadius={ 2 }
        direction="row"
        onClick={ () => navigate(`/customer/orders/${id}`) }
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          padding={ 2 }
        >
          <Typography
            variant="inherit"
            component="div"
            align="center"
            color="green"
            data-testid={ `customer_orders__element-order-id-${id}` }
          >
            { `Pedido ${id}` }
          </Typography>
        </Stack>
        <Stack
          direction="column"
          backgroundColor="#f1f1f1"
        >
          <Stack
            direction="row"
          >
            <Stack>
              <Typography
                component="div"
                align="center"
                color="white"
                backgroundColor="red"
                padding={ 2 }
                margin={ 2 }
                borderRadius={ 1 }
                data-testid={ `customer_orders__element-delivery-status-${id}` }
              >
                { status }
              </Typography>
            </Stack>
            <Stack
              direction="column"
            >
              <Stack>
                <Typography
                  component="div"
                  align="center"
                  color="green"
                  padding={ 1 }
                  data-testid={ `customer_orders__element-order-date-${id}` }
                >
                  { cleanedDate }
                </Typography>
              </Stack>
              <Stack>
                <Typography
                  component="div"
                  align="center"
                  color="green"
                  padding={ 1 }
                  data-testid={ `customer_orders__element-card-price-${id}` }
                >
                  { `R$ ${cleanedPrice}`}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <Typography
              component="div"
              fontSize={ 12 }
              marginLeft={ 1 }
              align="justify"
              color="green"
              data-testid={ `customer_orders__element-card-address-${id}` }
            >
              { `Endereço: ${deliveryAddress}, nº ${deliveryNumber}` }
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

OrderCard.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    saleDate: PropTypes.string.isRequired,
    totalPrice: PropTypes.string.isRequired,
    deliveryAddress: PropTypes.string.isRequired,
    deliveryNumber: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrderCard;
