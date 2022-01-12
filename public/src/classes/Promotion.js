// Import fetch module
import { fetchDataWithToken } from '../helpers/fetch.js';

export default class Promotion {
  // Create
  async create(productId, discount, startingDate, duration) {
    // Get the discount, date and product selected
    this.productId = productId;
    this.discount = discount;
    this.startingDate = startingDate;
    
    const dateObj = new Date(this.startingDate);
    const dateObjIncrement = new Date(+dateObj);
    const dayIncrementation = dateObjIncrement.getDate() + parseInt(duration);
    dateObjIncrement.setDate(dayIncrementation);
    this.endingDate = dateObjIncrement.toISOString().substring(0, 10);
    console.log(this.endingDate);

    // Generate the fetch body data
    const body = {
      "productId": this.productId,
      "discount": this.discount,
      "startingDate": this.startingDate,
      "endingDate": this.endingDate
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
      "currentStock": this.stock
    }

    // Update promotion
    const data = await fetchDataWithToken('PATCH', `http://localhost:4000/manager/promotion`, localStorage.getItem('token'), body);
    console.log(data);
    document.getElementById('update-form').reset();
  }
}