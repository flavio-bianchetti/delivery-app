import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Table, TableHead, TableRow, styled,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const TableDetails = ({ products, userRole }) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell
              align="center"
            >
              Item
            </StyledTableCell>
            <StyledTableCell
              align="center"
            >
              Descrição
            </StyledTableCell>
            <StyledTableCell
              align="center"
            >
              Quantidade
            </StyledTableCell>
            <StyledTableCell
              align="center"
            >
              Valor Unitário
            </StyledTableCell>
            <StyledTableCell
              align="center"
            >
              Sub-total
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {
            products.map((product, index) => {
              const { name, price, SalesProduct } = product;
              const { quantity } = SalesProduct;
              return (
                <StyledTableRow key={ index }>
                  <TableCell
                    align="center"
                    data-testid={
                      `${userRole}_order_details__
                      element-order-table-item-number-${index}`
                    }
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    align="center"
                    data-testid={
                      `${userRole}_order_details__element-order-table-name-${index}`
                    }
                  >
                    {name}
                  </TableCell>
                  <TableCell
                    align="center"
                    data-testid={
                      `${userRole}_order_details__element-order-table-quantity-${index}`
                    }
                  >
                    {quantity}
                  </TableCell>
                  <TableCell
                    align="center"
                    data-testid={
                      `${userRole}_order_details__element-order-table-unit-price-${index}`
                    }
                  >
                    {`R$ ${price.replace('.', ',')}`}
                  </TableCell>
                  <TableCell
                    align="center"
                    data-testid={
                      `${userRole}_order_details__element-order-table-sub-total-${index}`
                    }
                  >
                    {`R$ ${(Number(price) * quantity).toFixed(2).replace('.', ',')}`}
                  </TableCell>
                </StyledTableRow>
              );
            })
          }
        </tbody>
      </Table>
    </Box>
  );
};
TableDetails.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      SalesProduct: PropTypes.shape({
        quantity: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
  userRole: PropTypes.string.isRequired,
};

export default TableDetails;
