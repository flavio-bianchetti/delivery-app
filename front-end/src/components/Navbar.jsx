import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';
import Button from './Button';

const Navbar = () => {
  const navigate = useNavigate();
  const {
    userName,
    setIsLogout,
  } = useContext(DeliveryContext);

  return (
    <section
      className="navbar"
    >
      <Button
        className="navbar__btn-products"
        type="button"
        onClick={ () => navigate('/customer/products') }
        datatestid="customer_products__element-navbar-link-products"
        label="Produtos"
        disabled={ false }
      />
      <Button
        className="navbar__btn-orders"
        type="button"
        onClick={ () => navigate('/customer/orders') }
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
        onClick={ () => {
          setIsLogout(true);
          navigate('/login');
        } }
        datatestid="customer_products__element-navbar-link-logout"
        label="Sair"
        disabled={ false }
      />
    </section>
  );
};

export default Navbar;
