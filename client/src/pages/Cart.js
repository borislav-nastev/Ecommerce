import React from 'react';
import CartList from '../components/Cart/CartList';
import CartControl from '../components/Cart/CartControl/CartControl';

const Cart = () => {
  return (
    <section className='cart_section'>
      <CartList />
      <CartControl />
    </section>
  );
};

export default Cart;
