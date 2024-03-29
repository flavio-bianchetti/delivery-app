import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const SellerOrderCard = ({ sale }) => {
  const { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber } = sale;
  const cleanedDate = moment(Date.parse(saleDate)).format('DD/MM/YYYY');
  const cleanedPrice = totalPrice.replace('.', ',');

  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={ () => navigate(`/seller/orders/${id}`) }
    >
      <span data-testid={ `seller_orders__element-order-id-${id}` }>
        {`Pedido ${id}`}
        {' '}
      </span>
      <div data-testid={ `seller_orders__element-delivery-status-${id}` }>
        { status }
      </div>
      <div data-testid={ `seller_orders__element-order-date-${id}` }>
        { cleanedDate }
      </div>
      <div data-testid={ `seller_orders__element-card-price-${id}` }>
        { `R$ ${cleanedPrice}`}
      </div>
      <div data-testid={ `seller_orders__element-card-address-${id}` }>
        { `${deliveryAddress} ${deliveryNumber}`}
      </div>
    </button>
  );
};

SellerOrderCard.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    saleDate: PropTypes.string.isRequired,
    totalPrice: PropTypes.string.isRequired,
    deliveryAddress: PropTypes.string.isRequired,
    deliveryNumber: PropTypes.string.isRequired,
  }).isRequired,
};

export default SellerOrderCard;
