import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';

const App = () => (
  <Routes>
    <Route exact path="/login" element={ <Login /> } />
    <Route path="/" element={ <Navigate replace to="/login" /> } />
    <Route path="/customer/products" element={ <Products /> } />
  </Routes>
);

export default App;
