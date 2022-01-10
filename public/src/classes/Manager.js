// Import fetch module
import { fetchDataWithToken } from '../helpers/fetch.js';

export default class Manager {
  // Create
  async create(email, category, centerId) {
    // Get the email, category and center selected
    this.email = email;
    this.category = category;
    this.centerId = centerId;

    // Generate the fetch body data
    const body = {
      "email": this.email,
      "category": this.category,
      "centerId": this.centerId,
    }

    // Create admin
    const data = await fetchDataWithToken('POST', `http://localhost:4000/admin/manager`, localStorage.getItem('token'), body);
    console.log(data);
    document.getElementById('manager-form').reset();
  }
}