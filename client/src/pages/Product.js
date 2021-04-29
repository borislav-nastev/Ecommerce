import React from 'react';
import { useParams } from 'react-router';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';

import { useAppContext } from '../context/appContext';
import { useUserContext } from '../context/userContext';

const Product = () => {
  const history = useHistory();
  const { id } = useParams();
  const {
    findSingleProduct,
    removeProduct,
    findEditedProduct,
    addToCart,
  } = useAppContext();
  const { isAdmin, isAuth, showNotification } = useUserContext();

  const product = findSingleProduct(id);

  if (!product) {
    return <h2>No Product please chose one</h2>;
  }

  const { brand, model, image, description, price, quantity } = product;

  const handleClick = (e) => {
    e.preventDefault();
    findEditedProduct(id);
    history.push(`/edit-product/${id}`);
  };

  const buy = () => {
    if (!isAuth) {
      showNotification('Please logged in to continue');
      history.push('/login');
      return;
    }
    addToCart(id);
    showNotification('Successfully added a item');
    history.push('/cart');
  };

  const deleteProduct = () => {
    removeProduct(id);
    history.push('/');
  };

  return (
    <section className='single_item_section'>
      <header className='single_item_header'>
        <h2>
          {brand} <span>{model}</span>
        </h2>
      </header>
      <div className='single_item_img'>
        <img src={image} alt={model + ' image'} />
      </div>
      <div className='single_item_info'>
        <p className='description'>{description}</p>
        <div className='single_item_price'>
          <p
            className={`single_item_quantity ${
              quantity > 5 ? 'in_stoke' : 'last_items'
            }`}
          >
            {quantity > 5 ? 'In stock' : 'Last items'}
          </p>
          <p className='price_text'>
            $ <span>{price.toFixed(2)}</span>
          </p>
        </div>
      </div>
      <div className='single_item_buttons'>
        {isAdmin ? (
          <div>
            <FaEdit className='single_item_edit_icon' onClick={handleClick} />
            <FaTrashAlt
              className='single_item_delete_icon'
              onClick={deleteProduct}
            />
          </div>
        ) : (
          <div></div>
        )}
        <div className='single_item_user_btn'>
          <Link to='/' className='back_btn'>
            back
          </Link>
          <button className='buy_btn' onClick={buy}>
            buy
          </button>
        </div>
      </div>
    </section>
  );
};

export default Product;
