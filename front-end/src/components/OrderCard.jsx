import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  id,
  status,
  price,
  date,
}) => (
  <div
    // className="card"
    data-testid={ `customer_products__element-order-date-${id}` }
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
    <p>{ price }</p>
  </div>
);

Card.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};

export default Card;
