import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DeliveryContext from './DeliveryContext';

const DeliveryProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userToken, setUserToken] = useState('');

  const saveUserInfoLocalStorage = (name, email, role, token) => {
    setUserRole(role);
    setUserToken(token);
    localStorage.setItem('user.delivery', JSON.stringify({ name, email, role, token }));
  };

  const listDeliveryProvider = {
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    saveUserInfoLocalStorage,
    userRole,
    userToken,
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
