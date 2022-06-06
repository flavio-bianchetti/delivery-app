import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';
import Button from './Button';

const Navbar = () => {
  const navigate = useNavigate();
  const {
    userName,
    logout,
  } = useContext(DeliveryContext);

  const handleClick = (event) => {
    event.preventDefault();
    const { label } = event.target;
    if (label === 'Produtos') {
      navigate('/customer/products');
    }
    if (label === 'Meus Pedidos') {
      navigate('/customer/orders');
    }
    if (label === 'Produtos') {
      logout();
      navigate('/login');
    }
  };

  return (
    <section
      className="navbar"
    >
      <Button
        className="navbar__btn-products"
        type="button"
        onClick={ handleClick }
        datatestid="customer_products__element-navbar-link-products"
        label="Produtos"
        disabled={ false }
      />
      <Button
        className="navbar__btn-orders"
        type="button"
        onClick={ handleClick }
        datatestid="customer_products__element-navbar-link-orders"
        label="Meus Pedidos"
        disabled={ false }
      />
      <div
        className="navbar__div-username"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { userName }
      </div>
      <Button
        className="navbar__btn-logout"
        type="button"
        onClick={ handleClick }
        datatestid="customer_products__element-navbar-link-logout"
        label="Sair"
        disabled={ false }
      />
    </section>
  );
};

export default Navbar;
