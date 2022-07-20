import React, { useEffect, useState, useContext } from 'react';
import {
  Box, Typography, Table, TableBody, TableHead, TableRow, styled,
  IconButton, Grid,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import DeliveryContext from '../context/DeliveryContext';

const TABLE_CHECKOUT = [
  'Item',
  'Descrição',
  'Quantidade',
  'Valor Unitário',
  'Sub-total',
  'Remover Item',
];

function TableElement() {
  const [cart, setCart] = useState([]);

  const {
    totalCart,
    productsList,
    setProductsList,
  } = useContext(DeliveryContext);

  useEffect(() => {
    const newCart = productsList.filter((product) => product.quantity > 0);
    setCart(newCart);
  }, [productsList]);

  function handleClick(e) {
    const { name } = e.currentTarget;
    const newList = productsList
      .map((product) => {
        if (product.id === Number(name)) {
          return {
            ...product,
            quantity: 0,
            subTotal: 0,
          };
        }
        return product;
      });
    setProductsList(newList);
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'green',
      color: theme.palette.common.white,
      fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#e1e1e1',
      // backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <Box
      padding={ 2 }
    >
      <Typography
        color="green"
        variant="h4"
        component="div"
        align="center"
        padding={ 1 }
        borderRadius={ 2 }
      >
        Finalizar Pedido
      </Typography>
      <Table
        sx={ { minWidth: 700 } }
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            {
              TABLE_CHECKOUT.map((head) => (
                <StyledTableCell
                  align="center"
                  key={ Math.random() }
                >
                  {head}
                </StyledTableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            cart.map((product, index) => {
              const { name, price, quantity, subTotal, id } = product;

              return (
                <StyledTableRow key={ index }>
                  <TableCell
                    align="center"
                    data-testid={
                      `customer_checkout__element-order-table-item-number-${index}`
                    }
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    align="center"
                    data-testid={
                      `customer_checkout__element-order-table-name-${index}`
                    }
                  >
                    {name}
                  </TableCell>
                  <TableCell
                    align="center"
                    data-testid={
                      `customer_checkout__element-order-table-quantity-${index}`
                    }
                  >
                    {quantity}
                  </TableCell>
                  <TableCell
                    align="center"
                    data-testid={
                      `customer_checkout__element-order-table-unit-price-${index}`
                    }
                  >
                    {`R$ ${price.replace('.', ',')}`}
                  </TableCell>
                  <TableCell
                    align="center"
                    data-testid={
                      `customer_checkout__element-order-table-sub-total-${index}`
                    }
                  >
                    {`R$ ${subTotal}`}
                  </TableCell>
                  <TableCell
                    align="center"
                    data-testid={
                      `customer_checkout__element-order-table-remove-${index}`
                    }
                  >
                    <IconButton
                      color="error"
                      aria-label="delete"
                      name={ id }
                      onClick={ (e) => handleClick(e) }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              );
            })
          }
        </TableBody>
      </Table>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Grid
          data-testid="customer_checkout__element-order-total-price"
          backgroundColor="green"
          color="white"
          padding={ 2 }
          paddingLeft={ 4 }
          paddingRight={ 4 }
        >
          { `Total: R$ ${totalCart}` }
        </Grid>
      </Box>
    </Box>
  );
}

export default TableElement;
