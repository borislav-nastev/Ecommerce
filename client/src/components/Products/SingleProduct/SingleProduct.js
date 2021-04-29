import React from 'react';
import styles from './SingleProduct.module.css';
import { Link, useHistory } from 'react-router-dom';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

import { useUserContext } from '../../../context/userContext';
import { useAppContext } from '../../../context/appContext';

const SingleProduct = ({ model, brand, price, image, _id }) => {
  const history = useHistory();
  const { isAdmin, isAuth, showNotification } = useUserContext();
  const { removeProduct, findEditedProduct, addToCart } = useAppContext();

  const handleClick = (e) => {
    e.preventDefault();
    findEditedProduct(_id);
    history.push(`/edit-product/${_id}`);
  };

  const buy = (e) => {
    e.preventDefault();
    if (!isAuth) {
      showNotification('Please logged in to continue');
      history.push('/login');
      return;
    }
    addToCart(_id);
    history.push('/cart');
  };

  const deleteProduct = (e) => {
    e.preventDefault();
    removeProduct(_id);
  };

  return (
    <Link to={`/product/${_id}`}>
      <article className={styles.single_product}>
        <div className={styles.image_container}>
          <img src={image} alt={model + ' image'} />
        </div>
        <div className={styles.info_container}>
          <div>
            <p className={styles.model}>{model}</p>
            <p className={styles.brand}>{brand}</p>
          </div>
          <p className={styles.price}>{'$' + price.toFixed(2)}</p>
        </div>
        <div className={styles.btn_container}>
          {isAdmin ? (
            <div className={styles.admin_btn_container}>
              <FaEdit className={styles.edit_icon} onClick={handleClick} />
              <FaTrashAlt
                className={styles.delete_icon}
                onClick={deleteProduct}
              />
            </div>
          ) : (
            <div></div>
          )}
          <button className={styles.buy_btn} onClick={buy}>
            buy
          </button>
        </div>
      </article>
    </Link>
  );
};

export default SingleProduct;
