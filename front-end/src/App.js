import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';
import Orders from './pages/Orders';

const App = () => (
  <Routes>
    <Route exact path="/login" element={ <Login /> } />
    <Route path="/" element={ <Navigate replace to="/login" /> } />
    <Route path="/customer/products" element={ <Products /> } />
    <Route path="/register" element={ <Register /> } />
    <Route path="/customer/orders" element={ <Orders /> } />
  </Routes>
);

export default App;
