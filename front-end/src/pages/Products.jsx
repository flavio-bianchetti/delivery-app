import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import { requestData } from '../services/request';

const Products = () => {
  const navigate = useNavigate();
  const {
    userToken,
    productsList,
    setProductsList,
  } = useContext(DeliveryContext);

  useEffect(() => {
    async function getProducts() {
      const response = await requestData(userToken, '/products');
      const newArray = response.map((product) => ({
        ...product,
        quantity: 0,
      }));
      setProductsList(newArray);
    }
    if (!productsList.length) {
      getProducts();
    }
  }, [setProductsList, userToken]);

  const handleClick = (event) => {
    const { id } = event.target;
    const product = productsList.find((prod) => prod.id === Number(id));
    if (!product) return;
    const newQuantity = (
      event.target.innerHTML === '+'
        ? Number(product.quantity) + 1
        : Number(product.quantity) - 1
    );
    setProductsList(productsList.map((prod) => {
      if (prod.id === Number(id)) {
        return {
          ...prod,
          quantity: newQuantity,
        };
      }
      return prod;
    }));
  };

  return (
    <section>
      <Navbar />
      {
        productsList.map(
          (product) => (<Card
            key={ product.id }
            id={ product.id }
            name={ product.name }
            price={ product.price }
            urlImage={ product.urlImage }
            quantity={ product.quantity }
            onClick={ handleClick }
          />),
        )
      }
      <Button
        className="Products__button-cart"
        type="button"
        onClick={ () => navigate('/customer/checkout') }
        datatestid="customer_products__button-cart"
        label="Ver Carrinho"
        disabled={ false }
      />
    </section>
  );
};

export default Products;
