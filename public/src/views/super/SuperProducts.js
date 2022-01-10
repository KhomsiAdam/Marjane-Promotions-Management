import View from "../AbstractView.js";
import { fetchWithToken } from '../../helpers/fetch.js';

export class SuperProducts extends View {
  constructor(params) {
    super(params);
    this.setTitle('Products');
  }

  async viewProducts() {
    const data = await fetchWithToken('POST', 'http://localhost:4000/super/products', localStorage.getItem('token'));
    let html = '';
    if (data.products && data.products.length > 0) {
      for (let product of data.products) {
        html += `
        <tr class="text-gray-700 dark:text-gray-400">
          <td class="px-4 py-3">
                <p class="font-semibold">${product.name}</p>
          </td>
          <td class="px-4 py-3 text-sm">
            ${product.category}
          </td>
          <td class="px-4 py-3 text-sm">
            ${product.price} MAD
          </td>
          <td class="px-4 py-3 text-sm">
            ${product.quantity}
          </td>
          <td class="px-4 py-3">
            <div class="flex items-center justify-center space-x-4 text-sm">
              <button value="${product.id}" class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                </svg>
              </button>
              <button value="${product.id}" class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </td>
        </tr>
      `
      }
    } else {
      html = `<p class="px-4 py-2 text-yellow-500 font-semibold tracking-wide text-left border-b dark:border-gray-700 bg-gray-50 dark:text-yellow-500 dark:bg-gray-800">${data.message}</p>`;
    }
    return `
      <main class="bg-gray-100 w-full h-screen pt-[5.5rem] overflow-y-auto">
            <div class="container px-10 mx-auto grid">
            <div class="flex justify-between items-center">
            <h2 class="my-6 text-2xl font-semibold text-gray-700">Products</h2>

            <a href="/super/admins/create" nav-link class="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-indigo-900 border border-transparent rounded-lg active:bg-yellow-500 hover:bg-yellow-500 focus:outline-none focus:shadow-outline-yellow" >
              Create Product
              <span class="ml-2">+</span>
            </a>
            </div>

              <div class="w-full overflow-hidden rounded-lg shadow-xs">
              <div class="w-full overflow-x-auto">
                <table class="w-full whitespace-no-wrap">
                  <thead>
                    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                      <th class="px-4 py-3">Name</th>
                      <th class="px-4 py-3">Category</th>
                      <th class="px-4 py-3">Price</th>
                      <th class="px-4 py-3">Quantity</th>
                      <th class="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    ${html}
                  </tbody>
                </table>
              </div>
              
            </div>

            </div>
          </main>
        `
  }
}