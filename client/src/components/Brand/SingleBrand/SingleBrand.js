import React from 'react';
import styles from './SingleBrand.module.css';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

import { useBrandContext } from '../../../context/brandContext';
import { useUserContext } from '../../../context/userContext';

const SingleBrand = ({ name, _id }) => {
  const { removeBrand, findEditedBrand } = useBrandContext();
  const { isLoading } = useUserContext();

  return (
    <div className={styles.brand}>
      <p>{name}</p>
      <div className={styles.icons_container}>
        <button disabled={isLoading ? true : false}>
          <FaEdit
            className={styles.edit_icon}
            onClick={() => findEditedBrand(_id)}
          />
        </button>
        <button disabled={isLoading ? true : false}>
          <FaTrashAlt
            className={styles.delete_icon}
            onClick={() => removeBrand(_id)}
          />
        </button>
      </div>
    </div>
  );
};

export default SingleBrand;
