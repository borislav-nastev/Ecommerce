import { BASE_URL, adminEndpoints } from '../constant/endpoints';
import createRequestHeader from '../utils/createHeaders';

const getBrands = async (token) => {
  try {
    const res = await fetch(
      `${BASE_URL}${adminEndpoints.BRAND}`,
      createRequestHeader('GET', token)
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createBrand = async (name, token) => {
  try {
    const data = { name };
    const res = await fetch(
      `${BASE_URL}${adminEndpoints.BRAND}`,
      createRequestHeader('POST', token, data)
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const updateBrand = async (id, token, name) => {
  try {
    const data = { name };
    const res = await fetch(
      `${BASE_URL}${adminEndpoints.BRAND}/${id}`,
      createRequestHeader('PUT', token, data)
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteBrand = async (id, token) => {
  try {
    const res = await fetch(
      `${BASE_URL}${adminEndpoints.BRAND}/${id}`,
      createRequestHeader('DELETE', token)
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const getCategories = async (token) => {
  try {
    const res = await fetch(
      `${BASE_URL}${adminEndpoints.CATEGORY}`,
      createRequestHeader('GET', token)
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createCategory = async (name, token) => {
  try {
    const data = { name };
    const res = await fetch(
      `${BASE_URL}${adminEndpoints.CATEGORY}`,
      createRequestHeader('POST', token, data)
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const updateCategory = async (id, token, name) => {
  try {
    const data = { name };
    const res = await fetch(
      `${BASE_URL}${adminEndpoints.CATEGORY}/${id}`,
      createRequestHeader('PUT', token, data)
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteCategory = async (id, token) => {
  try {
    const res = await fetch(
      `${BASE_URL}${adminEndpoints.CATEGORY}/${id}`,
      createRequestHeader('DELETE', token)
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
