import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  className,
  id,
  type,
  onClick,
  datatestid,
  label,
  disabled,
}) => (
  <button
    className={ className }
    id={ id || className }
    type={ type === 'submit' ? 'submit' : 'button' }
    onClick={ onClick }
    data-testid={ datatestid }
    disabled={ disabled }
  >
    { label }
  </button>
);

Button.propTypes = {
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  datatestid: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default Button;
