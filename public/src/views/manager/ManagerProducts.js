import View from "../AbstractView.js";
import { fetchWithToken } from '../../helpers/fetch.js';

export class ManagerProducts extends View {
  constructor(params) {
    super(params);
    this.setTitle('Products');
  }

  async viewProducts() {
    const data = await fetchWithToken('POST', 'http://localhost:4000/manager/products', localStorage.getItem('token'));
    let html = '';
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
        </tr>
      `
    }
    return `
      <main class="bg-gray-100 w-full h-screen pt-[5.5rem] overflow-y-auto">
            <div class="container px-10 mx-auto grid">
            <div class="flex justify-between items-center">
            <h2 class="my-6 text-2xl font-semibold text-gray-700">Products</h2>
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