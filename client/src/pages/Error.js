import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <section className='error_page'>
      <p className='error_page_number'>404</p>
      <p className='error_page_text'>Not Found</p>
      <div>
        <Link to='/'>Go Home</Link>
      </div>
    </section>
  );
};

export default Error;
