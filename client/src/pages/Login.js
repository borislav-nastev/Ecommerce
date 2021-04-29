import React, { useState } from 'react';
import { useUserContext } from '../context/userContext';

import { validateEmail } from '../utils/validateEmail';

const initialUser = {
  email: '',
  password: '',
};

const Login = () => {
  const [user, setUser] = useState(initialUser);
  const { login, showNotification } = useUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(user.email)) {
      showNotification('Not valid email');
      return;
    }

    if (user.password.length < 6) {
      showNotification('Password length must be at least 6 characters');
      return;
    }

    login(user);
    setUser(initialUser);
  };

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  return (
    <section>
      <div className='form_container'>
        <h2 className='form_title'>Sign In</h2>
        <form onSubmit={handleSubmit}>
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

export default Login;
