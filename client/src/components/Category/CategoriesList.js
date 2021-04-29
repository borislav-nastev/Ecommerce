import React from 'react';
import styles from './CategoriesList.module.css';
import SingleCategory from './SingleCategory/SingleCategory';

import { useCategoryContext } from '../../context/categoryContext';

const CategoriesList = () => {
  const { categories } = useCategoryContext();

  return (
    <div className={styles.list_container}>
      {categories.map((category) => (
        <SingleCategory key={category._id} {...category} />
      ))}
    </div>
  );
};

export default CategoriesList;
