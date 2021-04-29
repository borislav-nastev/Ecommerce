import React from 'react';
import ProductsList from '../components/Products/ProductsList';
import SearchBar from '../components/SearchBar/SearchBar';

const Products = () => {
  return (
    <>
      <SearchBar />
      <ProductsList />
    </>
  );
};

export default Products;
