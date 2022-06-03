import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  className,
  id,
  type,
  value,
  onChange,
  datatestid,
  placeholder,
}) => (
  <input
    className={ className }
    id={ id }
    type={ type }
    value={ value }
    onChange={ onChange }
    data-testid={ datatestid }
    placeholder={ placeholder }
  />
);

Input.propTypes = {
  className: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  datatestid: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
