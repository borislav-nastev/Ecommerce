import React from 'react';
import styles from './SingleCategory.module.css';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

import { useCategoryContext } from '../../../context/categoryContext';
import { useUserContext } from '../../../context/userContext';

const SingleCategory = ({ name, _id }) => {
  const { removeCategory, findEditedCategory } = useCategoryContext();
  const { isLoading } = useUserContext();

  return (
    <div className={styles.category}>
      <p>{name}</p>
      <div className={styles.icons_container}>
        <button disabled={isLoading ? true : false}>
          <FaEdit
            className={styles.edit_icon}
            onClick={() => findEditedCategory(_id)}
          />
        </button>
        <button disabled={isLoading ? true : false}>
          <FaTrashAlt
            className={styles.delete_icon}
            onClick={() => removeCategory(_id)}
          />
        </button>
      </div>
    </div>
  );
};

export default SingleCategory;
