import React from 'react';
import PropTypes from 'prop-types';

const Label = ({
  className,
  htmlFor,
  datatestid,
  label,
}) => (
  <label
    className={ className }
    htmlFor={ htmlFor }
    data-testid={ datatestid }
  >
    { label }
  </label>
);

Label.propTypes = {
  className: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  datatestid: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Label;
