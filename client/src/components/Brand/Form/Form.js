import React, { useState, useEffect } from 'react';
import styles from './Form.module.css';
import { RiSendPlaneFill } from 'react-icons/ri';

import { useBrandContext } from '../../../context/brandContext';
import { useUserContext } from '../../../context/userContext';

const Form = () => {
  const [state, setState] = useState('');
  const { addBrand, editedBrand, editBrand } = useBrandContext();
  const { showNotification, isLoading } = useUserContext();

  useEffect(() => {
    if (editedBrand.name) {
      setState(editedBrand.name);
    }
  }, [editedBrand]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state) {
      showNotification('Brand is required');
      return;
    }

    if (editedBrand._id) {
      editBrand(state);
    } else {
      addBrand(state);
    }

    setState('');
  };

  return (
    <div className={`form_container ${styles.brand_form_container}`}>
      <form className={styles.brand_form} onSubmit={handleSubmit}>
        <div className='input_container'>
          <label htmlFor='brand'>Brand</label>
          <input
            type='text'
            name='brand'
            id='brand'
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <button type='submit' disabled={isLoading ? true : false}>
          <RiSendPlaneFill />
        </button>
      </form>
    </div>
  );
};

export default Form;
