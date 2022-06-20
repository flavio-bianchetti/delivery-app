import React from 'react';
import PropTypes from 'prop-types';

const tableColumns = ['Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total'];

const TableDetails = ({ saleProducts }) => {
  const { Products } = saleProducts;

  const fillLine = ({ name, SalesProducts, price }, index) => (
    <tr key={ index }>
      <td
        data-testid={ `customer_order_details__element-order-table-item-number-${index}` }
      >
        {name}
      </td>
      <td
        data-testid={ `customer_order_details__element-order-table-quantity-${index}` }
      >
        {SalesProducts.quantity}
      </td>
      <td
        data-testid={ `customer_order_details__element-order-table-sub-total-${index}` }
      >
        {price}
      </td>
      <td
        data-testid={ `customer_order_details__element-order-total-price-${index}` }
      >
        R$
        {(parseFloat(SalesProducts.quantity * price).toFixed(2).replace('.', ','))}
      </td>
    </tr>
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            { tableColumns.map((column, index) => <th key={ index }>{ column }</th>) }
          </tr>
        </thead>
        <tbody>
          { Products.map((product, index) => fillLine(product, index)) }
        </tbody>
      </table>
    </div>
  );
};

TableDetails.propTypes = {
  saleProducts: PropTypes.shape({
    Products: PropTypes.arrayOf(PropTypes.objectOf(String)).isRequired,
  }).isRequired,
};

export default TableDetails;
