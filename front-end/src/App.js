import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';

const App = () => (
  <Routes>
    <Route exact path="/" element={ <Login /> } />
    <Route path="/login" element={ <Login /> } />
    <Route path="/products" element={ <Products /> } />
  </Routes>
);

export default App;
