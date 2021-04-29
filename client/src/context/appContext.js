import React, { useState, useContext, createContext, useEffect } from 'react';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../api/productsAPI';
import filterByCriteria from '../utils/filterByCriteria';

import { useUserContext } from './userContext';

const accessToken = localStorage.getItem('accessToken') || '';
const initialCart = JSON.parse(localStorage.getItem('cartItems')) || [];
const initialEditedProduct =
  JSON.parse(localStorage.getItem('editedProduct')) || {};
const initialCriteria = {
  brand: 'all',
  category: 'all',
  price: 0,
  model: '',
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(initialCart);
  const [editedProduct, setEditedProduct] = useState(initialEditedProduct);
  const [criteria, setCriteria] = useState(initialCriteria);
  let maxPrice = 0;
  let minPrice = 0;

  const { showNotification, setIsLoading } = useUserContext();

  if (products.length > 0) {
    maxPrice = Math.max(...products.map((p) => p.price));
    minPrice = Math.min(...products.map((p) => p.price));
  }

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('editedProduct', JSON.stringify(editedProduct));
  }, [editedProduct]);

  let filteredProducts = [...products];

  filteredProducts = filterByCriteria(
    filteredProducts,
    'category',
    criteria.category
  );

  filteredProducts = filterByCriteria(
    filteredProducts,
    'brand',
    criteria.brand
  );

  filteredProducts = filterByCriteria(
    filteredProducts,
    'price',
    criteria.price
  );

  filteredProducts = filterByCriteria(
    filteredProducts,
    'model',
    criteria.model
  );

  const loadProducts = async () => {
    setIsLoading(true);
    const data = await getProducts();
    setIsLoading(false);

    const filteredData = data.filter((item) => item.quantity > 0);
    setProducts(filteredData);
  };

  const addProduct = async (product) => {
    setIsLoading(true);
    const res = await createProduct(product, accessToken);
    setIsLoading(false);

    if (res.data) {
      setProducts([...products, res.data]);
    }

    setEditedProduct({});
    showNotification(res.msg);
  };

  const findEditedProduct = (id) => {
    const product = products.find((e) => e._id === id);
    setEditedProduct(product);
  };

  const editProduct = async (product) => {
    setIsLoading(true);
    const res = await updateProduct(editedProduct._id, accessToken, product);
    setIsLoading(false);

    if (res.data) {
      const index = products.findIndex((p) => p._id === editedProduct._id);
      const newProducts = [...products];
      newProducts[index] = { ...res.data };
      setProducts(newProducts);
    }

    setEditedProduct({});
    showNotification(res.msg);
  };

  const removeProduct = async (id) => {
    if (window.confirm('Delete item')) {
      setIsLoading(true);
      const res = await deleteProduct(id, accessToken);
      setIsLoading(false);

      const newProducts = products.filter((product) => product._id !== id);
      setProducts(newProducts);
      showNotification(res.msg);
    }
  };

  const addToCart = (id) => {
    const index = cart.findIndex((p) => p._id === id);

    if (index !== -1) {
      showNotification('This product is already in your cart');
      return;
    }

    const product = products.find((p) => p._id === id);
    const newProduct = {
      ...product,
      maxQuantity: product.quantity,
      quantity: 1,
    };

    setCart([...cart, newProduct]);
    showNotification('Successfully added a item');
  };

  const manageQuantity = (id, value) => {
    const index = cart.findIndex((e) => e._id === id);
    const newItems = [...cart];
    newItems[index] = { ...newItems[index], quantity: value };
    setCart(newItems);
  };

  const removeItemFromCart = (id) => {
    const newItems = cart.filter((item) => item._id !== id);
    setCart(newItems);
  };

  const findSingleProduct = (id) => {
    const product = products.find((p) => p._id === id);
    return product;
  };

  return (
    <AppContext.Provider
      value={{
        filteredProducts,
        maxPrice,
        minPrice,
        products,
        editedProduct,
        addProduct,
        findEditedProduct,
        editProduct,
        removeProduct,
        addToCart,
        cart,
        setCart,
        manageQuantity,
        removeItemFromCart,
        findSingleProduct,
        setCriteria,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
