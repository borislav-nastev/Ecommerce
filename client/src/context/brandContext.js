import React, { useState, useContext, createContext, useEffect } from 'react';
import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} from '../api/adminAPI';

import { useUserContext } from './userContext';

const accessToken = localStorage.getItem('accessToken') || '';

const BrandContext = createContext();

const BrandProvider = ({ children }) => {
  const [brands, setBrands] = useState([]);
  const [editedBrand, setEditedBrand] = useState({});

  const { showNotification, setIsLoading } = useUserContext();

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    const data = await getBrands(accessToken);
    setBrands(data);
  };

  const addBrand = async (brand) => {
    setIsLoading(true);
    const res = await createBrand(brand, accessToken);
    setIsLoading(false);

    if (res.data) {
      setBrands([...brands, res.data]);
    }

    showNotification(res.msg);
  };

  const findEditedBrand = (id) => {
    const brand = brands.find((item) => item._id === id);
    setEditedBrand(brand);
  };

  const editBrand = async (brand) => {
    setIsLoading(true);
    const res = await updateBrand(editedBrand._id, accessToken, brand);
    setIsLoading(false);

    if (res.data) {
      const index = brands.findIndex((brand) => brand._id === editedBrand._id);
      const newBrands = [...brands];
      newBrands[index] = { ...res.data };
      setBrands(newBrands);
      setEditedBrand({});
    }

    showNotification(res.msg);
  };

  const removeBrand = async (id) => {
    if (window.confirm('Delete item')) {
      setIsLoading(true);
      const res = await deleteBrand(id, accessToken);
      setIsLoading(false);

      const newBrands = brands.filter((brand) => brand._id !== id);
      setBrands(newBrands);
      showNotification(res.msg);
    }
  };

  return (
    <BrandContext.Provider
      value={{
        brands,
        editedBrand,
        addBrand,
        findEditedBrand,
        editBrand,
        removeBrand,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};

const useBrandContext = () => {
  return useContext(BrandContext);
};

export { BrandProvider, useBrandContext };
