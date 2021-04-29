import { BASE_URL, orderEndpoints } from '../constant/endpoints';
import createRequestHeader from '../utils/createHeaders';

const getOrder = async (token) => {
  try {
    const res = await fetch(
      `${BASE_URL}${orderEndpoints.ORDER}`,
      createRequestHeader('GET', token)
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createOrder = async (token, orders) => {
  try {
    const data = { orders };
    const res = await fetch(
      `${BASE_URL}${orderEndpoints.ORDER}`,
      createRequestHeader('POST', token, data)
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const updateOrder = async (id, token, orders) => {
  try {
    const data = { orders };
    const res = await fetch(
      `${BASE_URL}${orderEndpoints.ORDER}/${id}`,
      createRequestHeader('PUT', token, data)
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteOrder = async (id, token) => {
  try {
    const res = await fetch(
      `${BASE_URL}${orderEndpoints.ORDER}/${id}`,
      createRequestHeader('DELETE', token)
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { getOrder, createOrder, updateOrder, deleteOrder };
