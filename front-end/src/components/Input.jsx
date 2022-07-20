import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/styles';

const Input = ({
  className,
  variant,
  size,
  label,
  id,
  type,
  value,
  onChange,
  datatestid,
  placeholder,
}) => (
  <TextField
    color="success"
    className={ className }
    variant={ variant }
    size={ size || 'normal' }
    label={ label }
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
  variant: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  datatestid: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
