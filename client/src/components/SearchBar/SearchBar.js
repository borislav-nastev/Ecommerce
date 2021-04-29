import React, { useState, useEffect, useCallback } from 'react';
import styles from './SearchBar.module.css';
import { VscSearch } from 'react-icons/vsc';
import debounce from 'lodash.debounce';

import { useCategoryContext } from '../../context/categoryContext';
import { useBrandContext } from '../../context/brandContext';
import { useAppContext } from '../../context/appContext';

const initialState = {
  brand: 'all',
  category: 'all',
  price: 0,
  model: '',
};

const SearchBar = () => {
  const [state, setState] = useState(initialState);
  const { brands } = useBrandContext();
  const { categories } = useCategoryContext();
  const { setCriteria, maxPrice, minPrice } = useAppContext();

  // eslint-disable-next-line
  const debounceSearch = useCallback(
    debounce((val) => setCriteria(val), 500),
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setCriteria(state);
  };

  const handleChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
    debounceSearch({ ...state, [name]: value });
  };

  useEffect(() => {
    setState({ ...state, price: maxPrice });
  }, [maxPrice]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className={styles.search_bar}>
      <h4>Search Bar</h4>
      <form onSubmit={handleSubmit}>
        <div className={styles.input_box}>
          <label htmlFor='model'>Model</label>
          <input
            type='text'
            name='model'
            value={state.model}
            onChange={handleChange}
          />
          <button type='submit' className={styles.search_btn}>
            <VscSearch />
          </button>
        </div>
        <div className={styles.input_group}>
          <div className={styles.select_box}>
            <label htmlFor='category'>Category</label>
            <select
              name='category'
              id='category'
              value={state.category}
              onChange={handleChange}
            >
              {[{ name: 'all', _id: '1' }, ...categories].map((c) => {
                return (
                  <option value={c.name} key={c._id}>
                    {c.name.toUpperCase()}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.select_box}>
            <label htmlFor='brand'>Brand</label>
            <select
              name='brand'
              id='brand'
              value={state.brand}
              onChange={handleChange}
            >
              {[{ name: 'all', _id: '1' }, ...brands].map((b) => {
                return (
                  <option value={b.name} key={b._id}>
                    {b.name.toUpperCase()}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className={styles.input_price}>
          <label htmlFor='price'>Price</label>
          <input
            type='range'
            name='price'
            id='price'
            max={maxPrice}
            min={minPrice}
            value={state.price}
            onChange={handleChange}
          />
          <div className={styles.max_min}>
            <p>{minPrice}</p>
            <p>{maxPrice}</p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SearchBar;
