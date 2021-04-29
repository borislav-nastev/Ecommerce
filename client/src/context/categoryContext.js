import React, { useState, useContext, createContext, useEffect } from 'react';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../api/adminAPI';

import { useUserContext } from './userContext';

const accessToken = localStorage.getItem('accessToken') || '';

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState({});

  const { showNotification, setIsLoading } = useUserContext();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await getCategories(accessToken);
    setCategories(data);
  };

  const addCategory = async (category) => {
    setIsLoading(true);
    const res = await createCategory(category, accessToken);
    setIsLoading(false);

    if (res.data) {
      setCategories([...categories, res.data]);
    }

    showNotification(res.msg);
  };

  const findEditedCategory = (id) => {
    const category = categories.find((category) => category._id === id);
    setEditedCategory(category);
  };

  const editCategory = async (category) => {
    setIsLoading(true);
    const res = await updateCategory(editedCategory._id, accessToken, category);
    setIsLoading(false);

    if (res.data) {
      const index = categories.findIndex((c) => c._id === editedCategory._id);
      const newCategories = [...categories];
      newCategories[index] = { ...res.data };
      setCategories(newCategories);
      setEditedCategory({});
    }

    showNotification(res.msg);
  };

  const removeCategory = async (id) => {
    if (window.confirm('Delete item')) {
      setIsLoading(true);
      const res = await deleteCategory(id, accessToken);
      setIsLoading(false);

      const newCategories = categories.filter(
        (category) => category._id !== id
      );

      setCategories(newCategories);
      showNotification(res.msg);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        editedCategory,
        addCategory,
        findEditedCategory,
        editCategory,
        removeCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

const useCategoryContext = () => {
  return useContext(CategoryContext);
};

export { CategoryProvider, useCategoryContext };
