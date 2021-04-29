import { BASE_URL, appEndpoints } from '../constant/endpoints';
import createRequestHeader from '../utils/createHeaders';

const getProducts = async () => {
  try {
    const res = await fetch(`${BASE_URL}${appEndpoints.PRODUCTS}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (product, token) => {
  try {
    const res = await fetch(
      `${BASE_URL}${appEndpoints.PRODUCTS}`,
      createRequestHeader('POST', token, product)
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (id, token, data) => {
  try {
    const res = await fetch(
      `${BASE_URL}${appEndpoints.PRODUCTS}/${id}`,
      createRequestHeader('PUT', token, data)
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (id, token) => {
  try {
    const res = await fetch(
      `${BASE_URL}${appEndpoints.PRODUCTS}/${id}`,
      createRequestHeader('DELETE', token)
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { getProducts, createProduct, updateProduct, deleteProduct };
