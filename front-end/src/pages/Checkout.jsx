import React from 'react';
import AdressForm from '../components/AdressForm';
import Navbar from '../components/Navbar';
import Table from '../components/Table';

const Checkout = () => (
  <section>
    <Navbar />
    <Table />
    <AdressForm />
  </section>
);

// componente table terá todos os produtos em uma tabela
// componente adressForm terá os inputs para o cliente finalizar o pedido

export default Checkout;
