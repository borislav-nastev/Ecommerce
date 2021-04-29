import React, { useState } from 'react';
import { validateEmail } from '../utils/validateEmail';

import { useUserContext } from '../context/userContext';

const initialUser = {
  name: '',
  email: '',
  password: '',
};

const Register = () => {
  const [user, setUser] = useState(initialUser);
  const { register, showNotification } = useUserContext();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.name) {
      showNotification('Name is required');
      return;
    }

    if (!validateEmail(user.email)) {
      showNotification('Please add correct email address');
      return;
    }

    if (user.password.length < 6) {
      showNotification('Password must be at least 6 characters long');
      return;
    }

    register(user);
    setUser(initialUser);
  };

  return (
    <section>
      <div className='form_container'>
        <h2 className='form_title'>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className='input_container'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              id='name'
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div className='input_container'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className='input_container'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <button className='form_btn' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
