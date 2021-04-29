import React from 'react';
import styles from './CartList.module.css';
import { Link } from 'react-router-dom';
import SingleItem from './SingleItem/SingleItem';
import Loading from '../Loading/Loading';

import { useAppContext } from '../../context/appContext';
import { useUserContext } from '../../context/userContext';

const CartList = () => {
  const { cart } = useAppContext();
  const { isLoading } = useUserContext();

  if (cart.length === 0) {
    return (
      <div className={styles.empty_cart}>
        <p>Your cart is empty</p>
        <Link to='/'>View Products</Link>
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className={styles.cart_list}>
      <h3 className={styles.cart_list_title}>
        Your {cart.length === 1 ? 'Product' : 'Products'}
      </h3>
      <div className={styles.carts_container}>
        {cart.map((item) => {
          return <SingleItem key={item._id} item={item} />;
        })}
      </div>
    </section>
  );
};

export default CartList;
