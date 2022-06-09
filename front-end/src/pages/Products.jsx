import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';

const Products = () => {
  const navigate = useNavigate();
  const {
    productsList,
    setProductsList,
    totalCart,
  } = useContext(DeliveryContext);

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
          subTotal: (newQuantity * prod.price).toFixed(2).replace('.', ','),
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
        id="button-cart"
        type="button"
        onClick={ () => navigate('/customer/checkout') }
        datatestid="customer_products__checkout-bottom-value"
        label={ `Ver Carrinho: R$ ${totalCart}` }
        disabled={ totalCart === '0,00' }
      />
    </section>
  );
};

export default Products;
