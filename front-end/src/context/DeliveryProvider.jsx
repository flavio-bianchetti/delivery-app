import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import DeliveryContext from './DeliveryContext';

const DeliveryProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userToken, setUserToken] = useState('');
  const [productsList, setProductsList] = useState([]);

  const saveUserInfoLocalStorage = (name, email, role, token) => {
    setUserRole(role);
    setUserToken(token);
    localStorage.setItem('user', JSON.stringify({ name, email, role, token }));
  };

  const logout = () => {
    setUserEmail('');
    setUserPassword('');
    setUserName('');
    setUserRole('');
    setUserToken('');
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const cart = productsList.filter((product) => product.quantity > 0);
    localStorage.setItem('carrinho', JSON.stringify(cart));
  }, [productsList]);

  const listDeliveryProvider = {
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    userName,
    setUserName,
    saveUserInfoLocalStorage,
    userRole,
    userToken,
    logout,
    productsList,
    setProductsList,
  };

  return (
    <DeliveryContext.Provider value={ listDeliveryProvider }>
      {children}
    </DeliveryContext.Provider>
  );
};

DeliveryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DeliveryProvider;
