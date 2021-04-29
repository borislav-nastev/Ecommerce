import React from 'react';
import Form from '../components/Category/Form/Form';
import CategoriesList from '../components/Category/CategoriesList';
import Title from '../components/Title/Title';

const Categories = () => {
  return (
    <section>
      <Title text='category' />
      <div className='common_section'>
        <Form />
        <CategoriesList />
      </div>
    </section>
  );
};

export default Categories;
