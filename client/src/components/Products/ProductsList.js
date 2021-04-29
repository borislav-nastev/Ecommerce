import React from 'react';
import styles from './ProductsList.module.css';
import SingleProduct from './SingleProduct/SingleProduct';
import Title from '../Title/Title';
import Loading from '../Loading/Loading';

import { useAppContext } from '../../context/appContext';
import { useUserContext } from '../../context/userContext';

const ProductsList = () => {
  const { filteredProducts } = useAppContext();
  const { isLoading } = useUserContext();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className={styles.product_list_container}>
      <Title text='products' />
      <div className={styles.products_container}>
        {filteredProducts.map((product) => {
          return <SingleProduct key={product._id} {...product} />;
        })}
      </div>
    </section>
  );
};

export default ProductsList;
