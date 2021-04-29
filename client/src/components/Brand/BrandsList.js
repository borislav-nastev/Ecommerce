import React from 'react';
import styles from './BrandsList.module.css';

import SingleBrand from './SingleBrand/SingleBrand';
import { useBrandContext } from '../../context/brandContext';

const BrandsList = () => {
  const { brands } = useBrandContext();

  if (brands.length === 0) {
    return null;
  }

  return (
    <div className={styles.list_container}>
      {brands.map((brand) => (
        <SingleBrand key={brand._id} {...brand} />
      ))}
    </div>
  );
};

export default BrandsList;
