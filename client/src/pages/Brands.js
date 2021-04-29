import React from 'react';
import Form from '../components/Brand/Form/Form';
import BrandsList from '../components/Brand/BrandsList';
import Title from '../components/Title/Title';

const Brands = () => {
  return (
    <section>
      <Title text='Brand' />
      <div className='common_section'>
        <Form />
        <BrandsList />
      </div>
    </section>
  );
};

export default Brands;
