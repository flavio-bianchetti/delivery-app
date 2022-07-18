import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

const ButtonElement = ({
  className,
  variant,
  size,
  color,
  id,
  type,
  onClick,
  datatestid,
  label,
  disabled,
}) => (
  <Button
    className={ className }
    variant={ variant }
    size={ size }
    color={ color }
    id={ id || className }
    type={ type === 'submit' ? 'submit' : 'button' }
    onClick={ onClick }
    data-testid={ datatestid }
    disabled={ disabled }
  >
    { label }
  </Button>
);

ButtonElement.propTypes = {
  className: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  datatestid: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default ButtonElement;
