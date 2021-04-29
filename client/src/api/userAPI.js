import { BASE_URL, userEndpoints } from '../constant/endpoints';
import createRequestHeader from '../utils/createHeaders';

const getUser = async (token) => {
  try {
    const res = await fetch(
      `${BASE_URL}${userEndpoints.USER_INFO}`,
      createRequestHeader('GET', token)
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const registerRequest = async (user) => {
  try {
    const res = await fetch(`${BASE_URL}${userEndpoints.REGISTER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const loginRequest = async (user) => {
  try {
    const res = await fetch(`${BASE_URL}${userEndpoints.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const logoutRequest = async () => {
  try {
    const res = await fetch(`${BASE_URL}${userEndpoints.LOGOUT}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { registerRequest, loginRequest, logoutRequest, getUser };
