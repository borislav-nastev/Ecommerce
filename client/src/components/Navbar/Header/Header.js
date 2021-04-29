import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

import { FaBars } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { FaCartArrowDown } from 'react-icons/fa';

import { useAppContext } from '../../../context/appContext';

const Header = ({ isToggle, toggleMenu }) => {
  const { cart } = useAppContext();
  return (
    <header className={styles.nav_header}>
      <div className={styles.logo}>
        <Link to='/'>
          <h1>
            Techno <span>World</span>
          </h1>
        </Link>
      </div>

      <div className={styles.nav_btn_container} onClick={toggleMenu}>
        {isToggle ? (
          <button className={styles.nav_btn}>
            <FaTimes />
          </button>
        ) : (
          <button className={styles.nav_btn}>
            <FaBars />
          </button>
        )}

        <Link to='/cart' className={styles.cart}>
          <p>{cart.length}</p>
          <FaCartArrowDown />
        </Link>
      </div>
    </header>
  );
};

export default Header;
