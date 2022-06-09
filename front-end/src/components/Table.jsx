import React, { useEffect, useState, useContext } from 'react';
import DeliveryContext from '../context/DeliveryContext';

const TABLE_CHECKOUT = [
  'Item',
  'Descrição',
  'Quantidade',
  'Valor Unitário',
  'Sub-total',
  'Remover Item',
];

function Table() {
  const [cart, setCart] = useState([]);

  const {
    totalCart,
  } = useContext(DeliveryContext);

  useEffect(() => {
    const newCart = JSON.parse(localStorage.getItem('carrinho'));
    setCart(newCart);
  }, []);

  return (
    <>
      <h2>Finalizar Pedido</h2>
      <table>
        <thead>
          <tr>
            {
              TABLE_CHECKOUT.map((head) => (
                <th key={ Math.random() }>{ head }</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            cart.map((product, index) => {
              const { name, price, quantity, subTotal } = product;

              return (
                <tr key={ index }>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-item-number-${index}`
                    }
                  >
                    {index + 1}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-name-${index}`
                    }
                  >
                    {name}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-quantity-${index}`
                    }
                  >
                    {quantity}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-unit-price-${index}`
                    }
                  >
                    {price.replace('.', ',')}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-sub-total-${index}`
                    }
                  >
                    {subTotal}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-remove-${index}`
                    }
                  >
                    <button
                      type="button"
                      onClick={ () => console.log('teste') }
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
      <div data-testid="customer_checkout__element-order-total-price">
        {`Total: R$ ${totalCart}`}
      </div>
    </>
  );
}

export default Table;
