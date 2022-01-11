// Components
import './components/index.js';
// Router
import { router } from './router.js';
// Classes
import Auth from './classes/Auth.js';
// Helpers
import { regexInputs, regexEmail } from './helpers/regex.js';
import { addError, regexError, regexEmailError, removeError } from './helpers/error.js';

// Init rounting
router();

// Navigation
const navigateTo = url => {
  history.pushState(null, null, url);
  router();
}

// History changes
window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  // Disable default link behaviors and navigate to selected view
  document.body.addEventListener('click', e => {
    if (e.target.matches('[nav-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  })

  // Logout button
  if (document.getElementById('logout')) {
    const logout = document.getElementById('logout');
    logout.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      location.replace('/');
    })
  }
})

window.addEventListener('load', () => {

  // Login form
  if (document.getElementById('sign-in')) {

    // Handling the sign in / login
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const sign_in_error = document.getElementById('sign-in-error');
    let role;
    document.getElementById('sign-in-button').addEventListener('click', (e) => {
      e.preventDefault();
      if (document.querySelector('input[name="role"]')) {

        role = document.querySelector('input[name="role"]:checked');

        // Check for empty values
        if (email.value === '' || password.value === '' || role === null) {
          sign_in_error.innerHTML = 'Please fill all the fields.';
          addError(email);
          addError(password);
        } else {
          // Check for special characters
          if (regexEmail(email.value) && regexInputs(password.value) && regexInputs(role.value)) {
            // Sign in the staff to view candidates
            const auth = new Auth();
            auth.signIn(email.value, password.value, role.value);
          } else if (!regexEmail(email.value) || !regexInputs(password.value) || !regexInputs(role.value)) {
            sign_in_error.innerHTML = 'Please enter valid characters.';
            regexEmailError(email);
            regexError(password);
          }
        }
      } else {
        // Check for empty values
        if (email.value === '' || password.value === '') {
          sign_in_error.innerHTML = 'Please fill all the fields.';
          addError(email);
          addError(password);
        } else {
          // Check for special characters
          if (regexEmail(email.value) && regexInputs(password.value)) {
            // Sign in the staff to view candidates
            const auth = new Auth();
            auth.signIn(email.value, password.value, 'super');
          } else if (!regexEmail(email.value) || !regexInputs(password.value)) {
            sign_in_error.innerHTML = 'Please enter valid characters.';
            regexEmailError(email);
            regexError(password);
          }
        }
      }
    })
    removeError(email, sign_in_error);
    removeError(password, sign_in_error);

    // Show/Hide password field in user login page
    if (document.getElementById('password')) {
      let password_field = document.getElementById('password');
      let password_eyecon = document.getElementById('password-eyecon');
      password_eyecon.addEventListener('click', () => {
        if (password_field.type === 'password') {
          password_field.type = 'text';
          password_eyecon.innerHTML = 'visibility';
        } else {
          password_field.type = 'password';
          password_eyecon.innerHTML = 'visibility_off';
        }
      })
    }
  }
})