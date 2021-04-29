import React, { useState, useEffect } from 'react';
import styles from './Form.module.css';
import { RiSendPlaneFill } from 'react-icons/ri';

import { useCategoryContext } from '../../../context/categoryContext';
import { useUserContext } from '../../../context/userContext';

const Form = () => {
  const [state, setState] = useState('');
  const { addCategory, editedCategory, editCategory } = useCategoryContext();
  const { showNotification, isLoading } = useUserContext();

  useEffect(() => {
    if (editedCategory.name) {
      setState(editedCategory.name);
    }
  }, [editedCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state) {
      showNotification('Category is required');
      return;
    }

    if (editedCategory._id) {
      editCategory(state);
    } else {
      addCategory(state);
    }

    setState('');
  };

  return (
    <div className={`form_container ${styles.category_form_container}`}>
      <form className={styles.category_form} onSubmit={handleSubmit}>
        <div className='input_container'>
          <label htmlFor='category'>Category</label>
          <input
            type='text'
            name='category'
            id='category'
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
