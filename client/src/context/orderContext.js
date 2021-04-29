import React, { createContext, useContext, useState } from 'react';
import {
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../api/orderAPI';

import { useAppContext } from './appContext';
import { useUserContext } from './userContext';

const accessToken = localStorage.getItem('accessToken') || '';

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({});

  const { setCart } = useAppContext();
  const { showNotification, setIsLoading } = useUserContext();

  const loadOrders = async () => {
    setIsLoading(true);
    const data = await getOrder(accessToken);
    setIsLoading(false);
    setOrders(data);
  };

  const addOrder = async (data) => {
    if (data.length === 0) {
      showNotification('Add items in cart');
      return;
    }

    setIsLoading(true);
    const res = await createOrder(accessToken, data);
    setIsLoading(false);

    if (res.data) {
      setCart([]);
    }

    showNotification(res.msg);
  };

  const editOrder = async (id, data, state) => {
    setIsLoading(true);
    const res = await updateOrder(id, accessToken, data);
    setIsLoading(false);

    const index = orders.findIndex((order) => order._id === id);
    const newOrders = [...orders];
    newOrders[index] = { ...orders[index], status: state };
    setOrders(newOrders);

    showNotification(res.msg);
  };

  const removeOrder = async (id) => {
    if (window.confirm('Delete item')) {
      setIsLoading(true);
      const res = await deleteOrder(id, accessToken);
      setIsLoading(false);

      const newOrders = orders.filter((order) => order._id !== id);
      setOrders(newOrders);

      showNotification(res.msg);
    }
  };

  const findSingleOrder = (id) => {
    setOrder(orders.find((o) => o._id === id));
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loadOrders,
        addOrder,
        editOrder,
        removeOrder,
        order,
        setOrder,
        findSingleOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

const useOrderContext = () => {
  return useContext(OrderContext);
};

export { OrderProvider, useOrderContext };
