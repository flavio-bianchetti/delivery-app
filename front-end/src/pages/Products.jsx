import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DeliveryContext from '../context/DeliveryContext';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

const Products = () => {
  const navigate = useNavigate();
  const {
    productsList,
    setProductsList,
    totalCart,
    setIsChangeProductList,
  } = useContext(DeliveryContext);

  const handleClick = (event) => {
    console.log(event.currentTarget.name, event.currentTarget.id);
    const { id, name } = event.currentTarget;
    const product = productsList.find((prod) => prod.id === Number(id));
    if (!product) return;
    const newQuantity = (
      name === '+'
        ? Number(product.quantity) + 1
        : Number(product.quantity) - 1
    );
    setProductsList(productsList.map((prod) => {
      if (prod.id === Number(id)) {
        return {
          ...prod,
          quantity: newQuantity,
          subTotal: (newQuantity * prod.price).toFixed(2).replace('.', ','),
        };
      }
      return prod;
    }));
    setIsChangeProductList(true);
  };

  const handleChange = (event) => {
    const { value, id } = event.target;
    const selectId = id.split('-')[1];
    const product = productsList.find((prod) => prod.id === Number(selectId));
    console.log(product);
    if (!product || !value.length) return;
    setProductsList(productsList.map((prod) => {
      if (prod.id === Number(selectId)) {
        return {
          ...prod,
          quantity: Number(value),
          subTotal: (Number(value) * prod.price).toFixed(2).replace('.', ','),
        };
      }
      return prod;
    }));
  };

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
            productsList.map(
              (product) => (
                <Stack
                  key={ product.id }
                  spacing={ 1 }
                  padding={ 1 }
                >
                  <Card
                    id={ product.id }
                    name={ product.name }
                    price={ product.price }
                    urlImage={ product.urlImage }
                    quantity={ product.quantity }
                    onClick={ handleClick }
                    onChange={ handleChange }
                  />
                </Stack>
              ),
            )
          }
        </Stack>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        marginBottom={ 2 }
        marginRight={ 2 }
      >
        <Fab
          color="success"
          aria-label="cart"
          variant="extended"
          disabled={ totalCart === '0,00' }
          datatestid="customer_products__button-cart"
          onClick={ () => navigate('/customer/checkout') }
        >
          <ShoppingCartCheckoutIcon sx={ { mr: 1 } } />
          { `Ver Carrinho: R$ ${totalCart}` }
        </Fab>
      </Box>
    </section>
  );
};

export default Products;
