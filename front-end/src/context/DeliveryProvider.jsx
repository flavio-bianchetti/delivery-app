import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import DeliveryContext from './DeliveryContext';
import { requestData } from '../services/request';

const DeliveryProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userToken, setUserToken] = useState('');
  const [productsList, setProductsList] = useState([]);
  const [totalCart, setTotalCart] = useState('');
  const [isChangeProductList, setIsChangeProductList] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const saveUserInfoLocalStorage = ({ id, name, email, role, token }) => {
    setUserRole(role);
    setUserToken(token);
    localStorage.setItem(
      'user',
      JSON.stringify({ id, name, email, role, token }),
    );
  };

  useEffect(() => {
    if (isLogout) {
      setUserId('');
      setUserEmail('');
      setUserPassword('');
      setUserName('');
      setUserRole('');
      setUserToken('');
      setProductsList([]);
      setTotalCart('');
      localStorage.removeItem('user');
      localStorage.removeItem('carrinho');
      setIsLogout(false);
    }
  }, [isLogout]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const { id, name, email, role, token } = user;
      setUserId(id || '');
      setUserEmail(email || '');
      setUserName(name || '');
      setUserRole(role || '');
      setUserToken(token || '');
    }
  }, []);

  useEffect(() => {
    async function getProducts() {
      const response = await requestData(userToken, '/products');
      const newArray = response.map((product) => ({
        ...product,
        quantity: 0,
        subTotal: 0,
      }));
      return newArray;
    }

    if (userToken.length) {
      getProducts()
        .then((response) => {
          setProductsList(response);
          const cart = JSON.parse(localStorage.getItem('carrinho'));
          if (cart) {
            setProductsList(
              response.map((product) => {
                const cartProduct = cart.find((prod) => prod.id === product.id);
                if (cartProduct) {
                  return {
                    ...product,
                    quantity: cartProduct.quantity,
                    subTotal: cartProduct.subTotal,
                  };
                }
                return product;
              }),
            );
          }
        });
    }
  }, [userToken]);

  useEffect(() => {
    if (isChangeProductList) {
      const cart = productsList.filter((product) => product.quantity > 0);
      if (cart.length) {
        localStorage.setItem('carrinho', JSON.stringify(cart));
      } else {
        localStorage.removeItem('carrinho');
      }
      setIsChangeProductList(false);
    }

    if (productsList.length) {
      const total = productsList.reduce(
        (acc, product) => (product.quantity > 0
          ? acc + Number((product.quantity * product.price).toFixed(2))
          : acc),
        0,
      );
      setTotalCart(total.toFixed(2).replace('.', ','));
    }
  }, [isChangeProductList, productsList]);

  const listDeliveryProvider = {
    userId,
    setUserId,
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    userName,
    setUserName,
    saveUserInfoLocalStorage,
    userRole,
    setUserRole,
    userToken,
    setUserToken,
    productsList,
    setProductsList,
    totalCart,
    isChangeProductList,
    setIsChangeProductList,
    setIsLogout,
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
