// Fetch function for verifying token
export const fetchWithToken = async (method, endpoint, token) => {
  const response = await fetch(endpoint, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  if (response.status === 500) {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    location.replace('/');
    throw new Error('Internal Server Error');
  }
  const data = await response.json();
  return data;
}
// Fetch function for verifying token
export const fetchDataWithToken = async (method, endpoint, token, body) => {
  const response = await fetch(endpoint, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })
  if (response.status === 500) {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    location.replace('/');
    throw new Error('Internal Server Error');
  }
  const data = await response.json();
  return data;
}
// Fetch function for POST, PUT, PATCH
export const fetchWithData = async (method, endpoint, body) => {
  const response = await fetch(endpoint, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(body)
  })
  if (response.status === 500) {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    location.replace('/');
    throw new Error('Internal Server Error');
  }
  const data = await response.json();
  return data;
}
// Fetch function for GET
export const fetchWithGet = async (endpoint) => {
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  if (response.status !== 200) {
    throw new Error('failed to fetch');
  }
  const data = await response.json();
  return data;
}