// Import fetch module
import { addError } from '../helpers/error.js';
import { fetchWithData, fetchWithGet } from '../helpers/fetch.js';

export default class Auth {
  // Login
  async signIn(email, password, role) {
    // Get the email and password entered
    this.email = email;
    this.password = password;
    this.role = role;

    switch (role) {
      case 'superadmin':
        this.endpoint = '/super/login'
        this.redirect = '/super/dashboard'
        break;
      case 'admin':
        this.endpoint = '/admin/login'
        this.redirect = '/admin/dashboard'
        break;
      case 'manager':
        this.endpoint = '/manager/login'
        this.redirect = '/manager/dashboard'
        break;
      default:
        this.endpoint = '/super/login'
        this.redirect = '/super/dashboard'
        break;
    }

    // Generate the fetch body data
    const body = {
      "email": this.email,
      "password": this.password,
    }

    // Get the staff by it's email
    const data = await fetchWithData('POST', `http://localhost:4000${this.endpoint}`, body);
    if (data.token) {
      console.log(data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', this.role);
      location.replace(this.redirect);
    } else {
      console.log(data);
      document.getElementById('sign-in-error').innerHTML = data.message;
      if (data.message == 'Wrong password!') {
        document.getElementById('password').classList.add('outline', 'outline-2', 'outline-red-600');
      } else {
        document.getElementById('email').classList.add('outline', 'outline-2', 'outline-red-600');
      }
    }
  }
}