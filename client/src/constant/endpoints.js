const BASE_URL = 'http://localhost:5000/';

const userEndpoints = {
  REGISTER: 'user/register',
  LOGIN: 'user/login',
  LOGOUT: 'user/logout',
  USER_INFO: 'user/info',
};

const adminEndpoints = {
  BRAND: 'api/brand',
  CATEGORY: 'api/category',
  ORDER: 'api/order',
};

const appEndpoints = {
  PRODUCTS: 'api/products',
};

const orderEndpoints = {
  ORDER: 'api/order',
};

export {
  BASE_URL,
  userEndpoints,
  adminEndpoints,
  appEndpoints,
  orderEndpoints,
};
