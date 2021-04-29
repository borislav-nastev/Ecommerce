import React from 'react';
import styles from './SingleItem.module.css';
import { TiDelete } from 'react-icons/ti';

import { useAppContext } from '../../../context/appContext';

const SingleItem = ({ item }) => {
  const { model, brand, price, quantity, _id, image, maxQuantity } = item;
  const { manageQuantity, removeItemFromCart } = useAppContext();

  const handleChange = ({ target: { value } }) => {
    manageQuantity(_id, value);
  };

  return (
    <article className={styles.cart_item_container}>
      <div className={styles.cart_image_container}>
        <img src={image} alt={model + 'image'} className={styles.cart_image} />
      </div>
      <div className={styles.cart_info}>
        <h4 className={styles.cart_info_title}>
          {brand} <span>{model}</span>
        </h4>
        <div className={styles.price_container}>
          <div className={styles.quantity_input}>
            <label htmlFor='quantity'>Quantity</label>
            <input
              type='number'
              name='quantity'
              id='quantity'
              value={quantity}
              onChange={handleChange}
              min='1'
              max={maxQuantity}
            />
          </div>
          <p className={styles.cart_price}>${price.toFixed(2)}</p>
        </div>
      </div>
      <button
        className={styles.remove_item_btn}
        onClick={() => removeItemFromCart(_id)}
      >
        <TiDelete />
      </button>
    </article>
  );
};

export default SingleItem;
