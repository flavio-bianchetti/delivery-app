import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  id,
  status,
  totalPrice,
  date,
  isSeller,
}) => (
  <div
    // className="card"
    data-testid={ isSeller
      ? `seller_orders__element-order-date-${id}`
      : `customer_products__element-order-date-${id}` }
  >
    <h3>
      Pedido 000
      { id }
    </h3>
    <div>
      <h2>
        { status }
      </h2>
    </div>
    <p>{ date }</p>
    <p>{ totalPrice }</p>
  </div>
);

Card.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  isSeller: PropTypes.bool.isRequired,
};

export default Card;
