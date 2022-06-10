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
    productsList,
    setProductsList,
  } = useContext(DeliveryContext);

  useEffect(() => {
    const newCart = productsList.filter((product) => product.quantity > 0);
    setCart(newCart);
  }, [productsList]);

  function handleClick(e) {
    const { id } = e.target;
    const newList = productsList
      .map((product) => {
        if (product.id === Number(id)) {
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

  return (
    <>
      <h2>Finalizar Pedido</h2>
      <table>
        <thead>
          <tr>
            {
              TABLE_CHECKOUT.map((head) => (
                <th key={ Math.random() }>{head}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            cart.map((product, index) => {
              const { name, price, quantity, subTotal, id } = product;

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
                      id={ id }
                      onClick={ (e) => handleClick(e) }
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
