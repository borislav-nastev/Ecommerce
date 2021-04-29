import React, { useState, useContext, createContext, useEffect } from 'react';
import {
  registerRequest,
  loginRequest,
  logoutRequest,
  getUser,
} from '../api/userAPI';

const initialAccessToken = localStorage.getItem('accessToken') || '';
const initialNotification = {
  msg: '',
  isShowing: false,
};

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(initialAccessToken);
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [notification, setNotification] = useState(initialNotification);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      setIsAuth(false);
      setIsAdmin(false);
      localStorage.removeItem('accessToken');
      return;
    }

    localStorage.setItem('accessToken', accessToken);
    setIsAuth(true);
    getUserInfo(accessToken);
  }, [accessToken]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(initialNotification);
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, [notification]);

  const showNotification = (msg) => {
    setNotification({ msg, isShowing: true });
  };

  const getUserInfo = async (token) => {
    const data = await getUser(token);
    if (data.role === 1) {
      setIsAdmin(true);
    }
  };

  const register = async (user) => {
    const data = await registerRequest(user);
    if (data.hasOwnProperty('msg')) {
      showNotification(data.msg);
      return;
    }
    setAccessToken(data.accessToken);
    showNotification('Successful sign up');
    window.location = '/';
  };

  const login = async (user) => {
    const data = await loginRequest(user);
    if (data.hasOwnProperty('msg')) {
      showNotification(data.msg);
      return;
    }
    setAccessToken(data.accessToken);
    showNotification('Successful sign in');
    window.location = '/';
  };

  const logout = async () => {
    await logoutRequest();
    showNotification('Successful logout');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('categories');
    localStorage.removeItem('brands');
    setAccessToken('');
    window.location = '/';
  };

  return (
    <UserContext.Provider
      value={{
        isAuth,
        isAdmin,
        login,
        logout,
        register,
        notification,
        showNotification,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
