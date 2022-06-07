import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Input from './Input';

const Card = ({
  id,
  name,
  price,
  urlImage,
  quantity,
  onClick,
}) => (
  <div
    className="card"
  >
    <h3
      className="card__title"
      data-testid={ `customer_products__element-card-title-${id}` }
    >
      { name }
    </h3>
    <img
      className="card__image"
      src={ urlImage }
      alt={ name }
      data-testid={ `customer_products__img-card-bg-image-${id}` }
    />
    <h4
      className="card__price"
      data-testid={ `customer_products__element-card-price-${id}` }
    >
      { `R$ ${price}` }
    </h4>
    <Button
      className="navbar__btn-decrement"
      type="button"
      onClick={ onClick }
      datatestid={ `customer_products__button-card-rm-item-${id}` }
      label="-"
      disabled={ quantity === 0 }
    />
    <Input
      className="card__input"
      type="number"
      value={ quantity }
      onChange={ () => true } // alterar aqui para decrementar quantidade
      data-testid={ `customer_products__input-card-quantity-${id}` }
    />
    <Button
      className="navbar__btn-increment"
      type="button"
      onClick={ onClick }
      datatestid={ `customer_products__button-card-add-item-${id}` }
      label="+"
      disabled={ false }
    />
  </div>
);

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;
