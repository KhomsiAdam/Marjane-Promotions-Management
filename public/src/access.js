import { fetchWithToken } from './helpers/fetch.js';
export const access = async () => {
  if (localStorage.getItem('token') && localStorage.getItem('role') && location.pathname !== '/' && location.pathname !== '/super') {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const data = await fetchWithToken('POST', `http://localhost:4000/${role}/verify`, token);
    if (data.message) {
      console.log(data.message);
      location.replace('/');
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    }
    if (location.pathname.split('/')[1] !== role) {
      console.log(location.pathname.split('/')[1]);
      console.log(role);
      const dashboard = `/${role}/dashboard`;
      location.replace(dashboard);
    }
  } else if ((localStorage.getItem('token') && localStorage.getItem('role')) && (location.pathname === '/' || location.pathname === '/super')) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const data = await fetchWithToken('POST', `http://localhost:4000/${role}/verify`, token);
    if (data.message) {
      console.log(data.message);
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    } else if (data === 'verified') {
      console.log(data);
      const dashboard = `/${role}/dashboard`;
      location.replace(dashboard);
    }
  } else if (!localStorage.getItem('token') && !localStorage.getItem('role') && location.pathname !== '/' && location.pathname !== '/super') {
    location.replace('/');
  }
}