import View from "../AbstractView.js";

export class SuperLogin extends View {
  constructor(params) {
    super(params);
    this.setTitle('Login');
  }

  async viewSuperLogin() {
    return `
    <main class="flex flex-col justify-center items-center h-screen px-3 m768:px-0">
    <div class="flex justify-center items-center">
      <img class="w-32" src="/images/logo-marjane.png" alt="Marjane Logo">
    </div>
    <form id="sign-in" class="form bg-white w-full max-w-lg p-8 m768:p-12 mt-10 mb-20 rounded-lg shadow-2xl flex flex-col">
        <label for="email" class="form__label font-bold mb-2">Email</label>
        <input type="text" name="email" id="email" class="form__input appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:border-indigo-900 focus:bg-white text-gray-700 mb-5">

        <label for="password" class="form__label font-bold mb-2">Mot de passe</label>
        <div class="password-container relative mb-5">
            <input type="password" name="password" id="password" class="form__input appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:border-indigo-900 focus:bg-white text-gray-700 pr-10">
            <span class="material-icons absolute inset-y-0 right-1 flex items-center p-3 cursor-pointer select-none" id="password-eyecon">visibility_off</span>
        </div>

        <p id="sign-in-error" class="input-error text-center font-bold text-red-600"></p>
        <button type="submit" id="sign-in-button" class="form__button w-full bg-indigo-900 hover:bg-indigo-700 text-white font-medium py-3 px-4 mt-5 rounded focus:shadow-outline">Login</button>
    </form>
    </main>
  `
  }

}