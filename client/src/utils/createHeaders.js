const createRequestHeader = (method, token, data) => {
  const requestHeader = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };

  if (data) {
    requestHeader.body = JSON.stringify(data);
  }

  return requestHeader;
};

export default createRequestHeader;
