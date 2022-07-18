import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Stack, Select, MenuItem, Grid, TextField,
  FormControl, InputLabel,
} from '@mui/material';
import DeliveryContext from '../context/DeliveryContext';
import { setData } from '../services/request';
import Button from './Button';

function AdressForm() {
  const [sellerList, setSellerList] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [sellerSelected, setSellerSelected] = useState('');
  const [isDisableButton, setIsDisableButton] = useState(true);

  const navigate = useNavigate();

  const {
    userToken,
    productsList,
    totalCart,
  } = useContext(DeliveryContext);

  async function submitSale() {
    const sellerId = Number(sellerSelected);
    const { id } = JSON.parse(localStorage.getItem('user'));
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

    navigate(`/customer/orders/${orderId}`);
  }

  const handleClick = (event) => {
    event.preventDefault();
    const { id } = event.target;
    setSellerSelected(id);
  };

  const selectSeller = () => (
    <FormControl
      sx={ { width: '100%' } }
    >
      <InputLabel
        id="label-select-vendedor"
      >
        Vendedor
      </InputLabel>
      <Select
        labelId="label-select-vendedor"
        label="Vendedor"
        // name="option"
        data-testid="customer_checkout__select-seller"
        value={ sellerSelected }
        onClick={ (e) => handleClick(e) }
      >
        {sellerList.map(
          (seller) => (
            <MenuItem
              key={ seller.id }
              id={ seller.id }
              value={ seller.id }
            >
              {seller.name}
            </MenuItem>
          ),
        ) }
      </Select>
    </FormControl>
  );

  const addressGrid = () => (
    <Box
      display="flex"
      component="form"
      autocomplete="on"
    >
      <Stack
        sx={ { width: '100%' } }
        direction="row"
        padding={ 2 }
        spacing={ 2 }
      >
        <Grid
          container
          spacing={ 2 }
        >
          <Grid
            item
            xs={ 6 }
          >
            { selectSeller() }

          </Grid>
          <Grid
            item
            xs={ 4 }
          >
            <TextField
              variant="outlined"
              label="Endereço"
              placeholder="digite o endereço"
              style={ { width: '100%' } }
              type="text"
              data-testid="customer_checkout__input-address"
              value={ deliveryAddress }
              onChange={ (e) => setDeliveryAddress(e.target.value) }
            />
          </Grid>
          <Grid
            item
            xs={ 2 }
          >
            <TextField
              variant="outlined"
              label="Número"
              placeholder="digite o número"
              style={ { width: '100%' } }
              type="text"
              data-testid="customer_checkout__input-addressNumber"
              value={ deliveryNumber }
              onChange={ (e) => setDeliveryNumber(e.target.value) }
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );

  useEffect(() => {
    async function getSeller() {
      const list = await setData(userToken, '/users', { role: 'seller' });
      setSellerList(list);
      setSellerSelected(list[0].id);
    }
    getSeller();
  }, [userToken]);

  useEffect(() => {
    if (deliveryAddress.length > 0
      && deliveryNumber.length > 0
      && totalCart !== '0,00'
      && Number(sellerSelected) > 0) {
      setIsDisableButton(false);
    } else {
      setIsDisableButton(true);
    }
  }, [deliveryAddress, deliveryNumber, isDisableButton, sellerSelected, totalCart]);

  return (
    <Box
      component="form"
      autocomplete="on"
    >
      <Stack
        display="flex"
        direction="column"
        paddingBottom={ 2 }
      >
        <Typography
          color="green"
          variant="h5"
          component="div"
          align="center"
          spacing={ 2 }
          paddingBottom={ 2 }
        >
          Detalhes e Endereço para Entrega
        </Typography>
        { addressGrid() }
        <Stack
          alignItems="center"
        >
          <Button
            className="btn-finalizar"
            type="button"
            variant="contained"
            label="Finalizar Pedido"
            data-testid="customer_checkout__button-submit-order"
            onClick={ () => submitSale() }
            disabled={ isDisableButton }
          />
        </Stack>
      </Stack>
    </Box>
  );
}

export default AdressForm;
