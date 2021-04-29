import React, { useState, useRef, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './CreateProductForm.module.css';

import convertToBase64 from '../../utils/convertToBase64';
import { useCategoryContext } from '../../context/categoryContext';
import { useBrandContext } from '../../context/brandContext';
import { useAppContext } from '../../context/appContext';
import { useUserContext } from '../../context/userContext';

const initialState = {
  model: '',
  price: 0,
  description: '',
  brand: '',
  image: '',
  category: '',
  quantity: 0,
};

const CreateProduct = () => {
  const [state, setState] = useState(initialState);
  const imageInputRef = useRef(null);
  const history = useHistory();
  const location = useLocation();

  const { categories } = useCategoryContext();
  const { brands } = useBrandContext();
  const { addProduct, editedProduct, editProduct } = useAppContext();
  const { showNotification } = useUserContext();

  useEffect(() => {
    if (location.pathname.includes('edit')) {
      setState(editedProduct);
    } else {
      setState(initialState);
    }
  }, [location.pathname, editedProduct]);

  const handleChange = async ({ target: { type, name, value } }) => {
    if (type === 'file') {
      const file = imageInputRef.current.files[0];
      if (file) {
        const base64 = await convertToBase64(file);
        setState({ ...state, [name]: base64 });
      }
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !state.model ||
      !state.price ||
      !state.description ||
      !state.brand ||
      !state.category ||
      !state.image ||
      !state.quantity
    ) {
      showNotification('All fields are required');
      return;
    }

    if (location.pathname.includes('edit')) {
      editProduct(state);
    } else {
      addProduct(state);
    }

    setState(initialState);
    imageInputRef.current.value = '';
    history.push('/');
  };

  return (
    <div className={`form_container ${styles.create_product}`}>
      <h2 className={`form_title ${styles.create_product_title}`}>
        {location.pathname.includes('edit') ? 'edit' : 'create'} product
      </h2>
      <form onSubmit={handleSubmit} className={styles.create_form}>
        <div>
          <div className='input_container'>
            <label htmlFor='model'>Model</label>
            <input
              type='text'
              name='model'
              id='model'
              value={state.model}
              onChange={handleChange}
            />
          </div>
          <div className={styles.multiple_inputs_container}>
            <div className={`input_container ${styles.select_container}`}>
              <label htmlFor='brand'>Brand</label>
              <select
                name='brand'
                id='brand'
                value={state.brand}
                onChange={handleChange}
              >
                <option value=''></option>
                {brands.map(({ name, _id }) => {
                  return (
                    <option key={_id} value={name}>
                      {name.toUpperCase()}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={`input_container ${styles.small_container}`}>
              <label htmlFor='price'>Price</label>
              <input
                type='number'
                min='0'
                name='price'
                id='price'
                value={state.price}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.multiple_inputs_container}>
            <div className={`input_container ${styles.select_container}`}>
              <label htmlFor='category'>Category</label>
              <select
                name='category'
                id='category'
                value={state.category}
                onChange={handleChange}
              >
                <option value=''></option>
                {categories.map(({ name, _id }) => {
                  return (
                    <option value={name} key={_id}>
                      {name.toUpperCase()}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={`input_container ${styles.small_container}`}>
              <label htmlFor='quantity'>Quantity</label>
              <input
                type='number'
                min='0'
                name='quantity'
                id='quantity'
                value={state.quantity}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div>
          <div className='input_container'>
            <label htmlFor='image'>Image</label>
            <input
              type='file'
              name='image'
              id='image'
              ref={imageInputRef}
              onChange={handleChange}
            />
          </div>
          <div className='input_container'>
            <label htmlFor='description'>Description</label>
            <textarea
              name='description'
              id='description'
              cols='30'
              rows='10'
              maxLength='450'
              value={state.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <button type='submit' className='form_btn'>
          {location.pathname.includes('edit') ? 'edit' : 'submit'}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
