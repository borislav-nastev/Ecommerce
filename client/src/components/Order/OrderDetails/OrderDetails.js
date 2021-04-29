import React from 'react';
import styles from './OrderDetails.module.css';
import Loading from '../../Loading/Loading';
import { FaWindowClose } from 'react-icons/fa';

import { useOrderContext } from '../../../context/orderContext';
import { useUserContext } from '../../../context/userContext';

const SingleItem = ({ image, model, brand, price, quantity }) => {
  return (
    <article className={styles.single_item}>
      <header>
        <h4>
          {brand} <span>{model}</span>
        </h4>
      </header>
      <div className={styles.single_item_img}>
        <img src={image} alt={model + ' image'} />
      </div>
      <div className={styles.single_item_price_container}>
        <p className={styles.single_item_price}>
          Single price: <span>${price.toFixed(2)}</span>
        </p>
        <p className={styles.single_item_quantity}>
          Quantity: <span>{quantity}</span>
        </p>
      </div>
    </article>
  );
};

const OrderDetails = () => {
  const { order, setOrder } = useOrderContext();
  const { isLoading } = useUserContext();

  if (!order._id) {
    return null;
  }

  if (isLoading) {
    return <Loading />;
  }

  const { orders } = order;
  return (
    <div className={styles.details}>
      <div className={styles.details_container}>
        {orders.map((item) => {
          return <SingleItem key={item._id} {...item} />;
        })}
      </div>
      <FaWindowClose
        className={styles.close_details}
        onClick={() => setOrder({})}
      />
    </div>
  );
};

export default OrderDetails;
