import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

import Header from './Header/Header';

import { useUserContext } from '../../context/userContext';

const Navbar = () => {
  const [isToggle, setIsToggle] = useState(false);

  const { isAdmin, isAuth, logout } = useUserContext();

  const toggleMenu = () => {
    setIsToggle(!isToggle);
  };

  return (
    <nav className={styles.nav_container}>
      <Header isToggle={isToggle} toggleMenu={toggleMenu} />

      <div
        className={
          isToggle
            ? `${styles.links_container} ${styles.show_container}`
            : styles.links_container
        }
      >
        <ul className={styles.links}>
          <li>
            <Link to='/'>products</Link>
          </li>

          {isAuth ? (
            <React.Fragment>
              {isAdmin && (
                <li>
                  <Link to='/categories'>categories</Link>
                </li>
              )}
              {isAdmin && (
                <li>
                  <Link to='/brands'>brands</Link>
                </li>
              )}
              {isAdmin && (
                <li>
                  <Link to='/create-product'>create product</Link>
                </li>
              )}
              <li>
                <Link to='/order'>{isAdmin ? 'orders' : 'my orders'}</Link>
              </li>
              <li>
                <Link to='#' onClick={logout}>
                  logout
                </Link>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <Link to='/login'>sign in</Link>
              </li>
              <li>
                <Link to='/register'>sign up</Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
