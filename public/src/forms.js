// Classes
import Admin from './classes/Admin.js';
import Manager from './classes/Manager.js';
import Promotion from './classes/Promotion.js';
// Helpers
import { regexInputs, regexEmail } from './helpers/regex.js';
import { addError, regexError, regexEmailError, removeError } from './helpers/error.js';

export const initForms = () => {
  if (document.getElementById('admin-form')) {
    // Handling the sign in / login
    const email = document.getElementById('email');
    const center = document.getElementById('center');
    const admin_error = document.getElementById('admin-error');
    document.getElementById('admin-submit').addEventListener('click', (e) => {
      e.preventDefault();
      // Check for empty values
      if (email.value === '' || center.value === '') {
        admin_error.innerHTML = 'Please fill all the fields.';
        addError(email);
        addError(center);
      } else {
        // Check for special characters
        if (regexEmail(email.value) && regexInputs(center.value)) {
          // Create an admin
          const admin = new Admin();
          admin.create(email.value, center.value);
        } else if (!regexEmail(email.value) || !regexInputs(center.value)) {
          admin_error.innerHTML = 'Please enter valid characters.';
          regexEmailError(email);
          regexError(center);
        }
      }
    })
    removeError(email, admin_error);
    removeError(center, admin_error);
  }

  // Create manager form
  if (document.getElementById('manager-form')) {

    // Handling the sign in / login
    const email = document.getElementById('email');
    const category = document.getElementById('category');
    const center = document.getElementById('center');
    const manager_error = document.getElementById('manager-error');
    document.getElementById('manager-submit').addEventListener('click', (e) => {
      e.preventDefault();
      // Check for empty values
      if (email.value === '' || category.value === '' || center.value === '') {
        manager_error.innerHTML = 'Please fill all the fields.';
        addError(email);
        addError(category);
        addError(center);
      } else {
        // Check for special characters
        if (regexEmail(email.value) && regexInputs(category.value) && regexInputs(center.value)) {
          // Sign in the staff to view candidates
          const manager = new Manager();
          manager.create(email.value, category.value, center.value);
        } else if (!regexEmail(email.value) || !regexInputs(category.value) || !regexInputs(center.value)) {
          manager_error.innerHTML = 'Please enter valid characters.';
          regexEmailError(email);
          regexError(category);
          regexError(center);
        }
      }
    })
    removeError(email, manager_error);
    removeError(category, manager_error);
    removeError(center, manager_error);
  }

  // Create promotion form
  if (document.getElementById('promotion-form')) {

    // Handling the sign in / login
    const product = document.getElementById('product');
    const discount = document.getElementById('discount');
    const startingDate = document.getElementById('startingDate');
    const duration = document.getElementById('duration');
    const promotion_error = document.getElementById('promotion-error');

    // Set the current date as the minimal value for the input date
    const current_date = new Date().toISOString().substring(0, 10);
    startingDate.setAttribute("min", current_date);

    document.getElementById('promotion-submit').addEventListener('click', (e) => {
      e.preventDefault();
      // Check for empty values
      if (product.value === '' || discount.value === '' || startingDate.value === '' || duration.value === '') {
        promotion_error.innerHTML = 'Please fill all the fields.';
        addError(product);
        addError(discount);
        addError(startingDate);
        addError(duration);
      } else {
        // Check for special characters
        if (regexInputs(product.value) && regexInputs(discount.value) && regexInputs(startingDate.value) && regexInputs(duration.value)) {
          // Sign in the staff to view candidates
          const promotion = new Promotion();
          promotion.create(product.value, discount.value, startingDate.value, duration.value);
        } else if (!regexInputs(product.value) || !regexInputs(discount.value) || !regexInputs(startingDate.value) || !regexInputs(duration.value)) {
          promotion_error.innerHTML = 'Please enter valid characters.';
          regexError(product);
          regexError(discount);
          regexError(startingDate);
          regexError(duration);
        }
      }
    })
    removeError(product, promotion_error);
    removeError(discount, promotion_error);
    removeError(startingDate, promotion_error);
    removeError(duration, promotion_error);
  }

  // Update promotion form
  if (document.getElementById('update-form')) {

    // Handling the sign in / login
    const status = document.getElementById('status');
    const comment = document.getElementById('comment');
    const stock = document.getElementById('stock');
    const update_error = document.getElementById('update-error');
    document.getElementById('update-submit').addEventListener('click', (e) => {
      e.preventDefault();
      // Check for empty values
      if (status.value === '' || comment.value === '' || stock.value === '') {
        update_error.innerHTML = 'Please fill all the fields.';
        addError(status);
        addError(comment);
        addError(stock);
      } else {
        // Check for special characters
        if (regexInputs(status.value) && regexInputs(comment.value) && regexInputs(stock.value)) {
          // Sign in the staff to view candidates
          const promotion = new Promotion();
          promotion.update(document.getElementById('update-submit').value, status.value, comment.value, stock.value);
        } else if (!regexInputs(status.value) || !regexInputs(comment.value) || !regexInputs(stock.value)) {
          update_error.innerHTML = 'Please enter valid characters.';
          regexError(status);
          regexError(comment);
          regexError(stock);
        }
      }
    })
    removeError(status, update_error);
    removeError(comment, update_error);
    removeError(stock, update_error);
  }
}