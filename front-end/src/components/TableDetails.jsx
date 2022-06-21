import React from 'react';
import PropTypes from 'prop-types';

const TableDetails = ({ products, userRole }) => (
  <section>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
        </tr>
      </thead>
      <tbody>
        {
          products.map((product, index) => {
            const { name, price, SalesProduct } = product;
            const { quantity } = SalesProduct;
            return (
              <tr key={ index }>
                <td
                  data-testid={
                    `${userRole}_order_details__element-order-table-item-number-${index}`
                  }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={
                    `${userRole}_order_details__element-order-table-name-${index}`
                  }
                >
                  {name}
                </td>
                <td
                  data-testid={
                    `${userRole}_order_details__element-order-table-quantity-${index}`
                  }
                >
                  {quantity}
                </td>
                <td
                  data-testid={
                    `${userRole}_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  {price.replace('.', ',')}
                </td>
                <td
                  data-testid={
                    `${userRole}_order_details__element-order-table-sub-total-${index}`
                  }
                >
                  {(Number(price) * quantity).toFixed(2).replace('.', ',')}
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  </section>
);
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
