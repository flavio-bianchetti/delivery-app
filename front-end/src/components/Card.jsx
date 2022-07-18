import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Input from './Input';

const Card = ({
  id,
  name,
  price,
  urlImage,
  quantity,
  onClick,
  onChange,
}) => (
  <Box
    className="card"
    display="flex"
  >
    <Stack
      sx={ { width: '200px', height: '250px' } }
      direction="column"
      spacing={ 1 }
      border="1px solid green"
      borderRadius={ 1 }
    >
      <Stack
        display="flex"
        spacing={ 1 }
        padding={ 1 }
        alignItems="center"
        justifyContent="center"
      >
        <img
          className="card__image"
          src={ urlImage }
          alt={ name }
          height="150px"
          data-testid={ `customer_products__img-card-bg-image-${id}` }
        />

      </Stack>
      <Stack
        backgroundColor="#f1f1f1"
        direction="column"
      >
        <Stack
          paddingBottom={ 1 }
        >
          <Typography
            variant="inherit"
            component="div"
            align="center"
            color="green"
          >
            { name }
          </Typography>
        </Stack>
        <Stack
          display="flex"
          direction="row"
          width="100%"
          height="100%"
          paddingBottom={ 1 }

        >
          <IconButton
            aria-label="remove"
            color="error"
            name="-"
            id={ id }
            onClick={ onClick }
            datatestid={ `customer_products__button-card-rm-item-${id}` }
            disabled={ quantity === 0 }
          >
            <RemoveCircleIcon />
          </IconButton>
          <Input
            className="card__input"
            variant="outlined"
            size="small"
            type="text"
            value={ quantity }
            onChange={ onChange }
            datatestid={ `customer_products__input-card-quantity-${id}` }
          />
          <IconButton
            aria-label="add"
            color="success"
            name="+"
            id={ id }
            onClick={ onClick }
            datatestid={ `customer_products__button-card-add-item-${id}` }
            disabled={ false }
          >
            <AddCircleIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
    <Stack
      display="flex"
      position="absolute"
      margin={ 0.5 }
      padding={ 0.5 }
      backgroundColor="white"
      color="green"
      borderRadius={ 1 }
    >
      <Typography
        variant="h6"
        component="div"
        align="center"
      >
        { `R$ ${price.replace('.', ',')}` }
      </Typography>
    </Stack>

  </Box>
);

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Card;
