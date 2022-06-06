import React, { useEffect, useContext } from 'react';
import DeliveryContext from '../context/DeliveryContext';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import { requestData } from '../services/request';

const Products = () => {
  const {
    userToken,
    productsList,
    setProductsList,
  } = useContext(DeliveryContext);

  useEffect(() => {
    async function getProducts() {
      const response = await requestData(userToken, '/products');
      setProductsList(response);
    }
    getProducts();
  }, [setProductsList, userToken]);

  return (
    <section>
      <Navbar />
      {
        productsList.map(
          (product) => (<Card
            key={ product.id }
            id={ product.id }
            name={ product.name }
            price={ product.price }
            urlImage={ product.urlImage }
            quantity={ 0 } // qual será a melhor forma para armazenar a quantidade do produto?
          />),
        )
      }
    </section>
  );
};

export default Products;
