// Import fetch module
import { fetchDataWithToken } from '../helpers/fetch.js';

export default class Admin {
  // Create
  async create(email, centerId) {
    // Get the email and center selected
    this.email = email;
    this.centerId = centerId;

    // Generate the fetch body data
    const body = {
      "email": this.email,
      "centerId": this.centerId,
    }

    // Create admin
    const data = await fetchDataWithToken('POST', `http://localhost:4000/super/admin`, localStorage.getItem('token'), body);
    console.log(data);
    document.getElementById('admin-form').reset();
  }
}