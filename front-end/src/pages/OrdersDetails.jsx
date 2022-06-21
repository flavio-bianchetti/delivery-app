import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Navbar from '../components/Navbar';
import { requestData } from '../services/request';
import TableDetails from '../components/TableDetails';

const OrdersDetails = () =>
// const [saleProducts, setSaleProducts] = useState([]);

// const { status, saleDate, totalPrice } = saleProducts;
// const date = moment(Date.parse(saleDate)).format('DD/MM/YYYY');

// const { id } = useParams();

// useEffect(() => {
//   async function getProducts() {
//     const { token } = JSON.parse(localStorage.getItem('user'));
//     const products = await requestData(token, `/sales/${id}`);
//     setSaleProducts(products);
//   }
//   getProducts();
// }, [id]);

  (
    <section>
      <Navbar />
      {/* <div>
        <div>
          <div
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            { `Pedido ${id}` }
          </div>
          <div
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            P. Vend: Fulana Pereira
          </div>
          <div
            data-testid="customer_order_details__element
          -order-details-label-order-date"
          >
            { date }
          </div>
          <div
            data-testid="customer_order_details__element
            -order-details-label-delivery-status"
          >
            { status }
          </div>
          <button
            type="button"
            disabled
            data-testid="customer_order_details__button-delivery-check"
          >
            MARCAR COMO ENTREGUE
          </button>
        </div>
        <TableDetails saleProducts={ saleProducts } />
        <div>
          <span>Total: R$</span>
          <span data-testid="customer_order_details__element-order-total-price">
            {totalPrice.replace('.', ',')}
          </span>
        </div>
      </div>
      <p>salve</p> */}
    </section>
  );
export default OrdersDetails;
