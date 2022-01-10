// Import fetch module
import { fetchDataWithToken } from '../helpers/fetch.js';

export default class Promotion {
  // Create
  async create(productId, discount, date) {
    // Get the discount, date and product selected
    this.productId = productId;
    this.discount = discount;
    this.date = date;

    // Generate the fetch body data
    const body = {
      "productId": this.productId,
      "discount": this.discount,
      "stock": this.date
    }

    // Create promotion
    const data = await fetchDataWithToken('POST', `http://localhost:4000/admin/promotion`, localStorage.getItem('token'), body);
    console.log(data);
    document.getElementById('promotion-form').reset();
  }
  // Update
  async update(promotionId, status, comment, stock) {
    // Get the status, comment, stock and promotion selected
    this.promotionId = promotionId;
    this.status = status;
    this.comment = comment;
    this.stock = stock;

    // Generate the fetch body data
    const body = {
      "promotionId": this.promotionId,
      "status": this.status,
      "comment": this.comment,
      "stock": this.stock
    }

    // Update promotion
    const data = await fetchDataWithToken('PATCH', `http://localhost:4000/manager/promotion`, localStorage.getItem('token'), body);
    console.log(data);
    document.getElementById('update-form').reset();
  }
}