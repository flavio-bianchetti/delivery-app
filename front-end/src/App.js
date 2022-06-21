import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import SellerOrders from './pages/SellerOrders';
import OrdersDetails from './pages/OrdersDetails';

const App = () => (
  <Routes>
    <Route path="/" element={ <Navigate replace to="/login" /> } />
    <Route path="/login" element={ <Login /> } />
    <Route path="/register" element={ <Register /> } />
    <Route path="/customer/products" element={ <Products /> } />
    <Route path="/customer/orders" element={ <Orders /> } />
    <Route path="/customer/orders/:id" element={ <OrdersDetails /> } />
    <Route path="/customer/checkout" element={ <Checkout /> } />
    <Route path="/seller/orders" element={ <SellerOrders /> } />
  </Routes>
);

export default App;
