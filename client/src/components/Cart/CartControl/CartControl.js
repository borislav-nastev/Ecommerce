import React, { useState, useEffect } from 'react';
import styles from './CartControl.module.css';
import { Link } from 'react-router-dom';

import { useAppContext } from '../../../context/appContext';
import { useOrderContext } from '../../../context/orderContext';
import { useUserContext } from '../../../context/userContext';

const CartControl = () => {
  const [totalSum, setTotalSum] = useState(0);
  const { cart } = useAppContext();
  const { addOrder } = useOrderContext();
  const { isLoading } = useUserContext();

  useEffect(() => {
    const total = cart.reduce((acc, curr) => {
      acc = acc + Number(curr.quantity) * Number(curr.price);
      return acc;
    }, 0);
    setTotalSum(total);
  }, [cart]);

  return (
    <article className={styles.cart_control}>
      <h4 className={styles.cart_control_title}>Total Sum</h4>
      <p className={styles.total_sum}>${totalSum.toFixed(2)}</p>
      <div className={styles.cart_control_btn}>
        <Link to='/'>Continue Shopping</Link>
        <button
          disabled={isLoading ? true : false}
          className={styles.cart_control_buy}
          onClick={() => addOrder(cart)}
        >
          BUY
        </button>
      </div>
    </article>
  );
};

export default CartControl;
