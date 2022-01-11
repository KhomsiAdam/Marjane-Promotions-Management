import View from "../AbstractView.js";
import { fetchWithToken } from '../../helpers/fetch.js';

export class AdminPromotions extends View {
  constructor(params) {
    super(params);
    this.setTitle('Promotions');
  }

  async getPromotions() {
    const data = await fetchWithToken('POST', 'http://localhost:4000/admin/promotions', localStorage.getItem('token'));
    let html = '';
    let statusClass;
    console.log(data);
    if (data.promotions && data.promotions.length > 0) {
      for (let promotion of data.promotions) {
        if (promotion.comment === null) promotion.comment = '';
        switch (promotion.status) {
          case 'Accepted':
            statusClass = 'bg-green-100 dark:bg-green-700';
            break;
          case 'Pending':
            statusClass = 'bg-yellow-100 dark:bg-yellow-700';
            break;
          case 'Refused':
            statusClass = 'bg-orange-100 dark:bg-orange-700';
            break;
          case 'Untreated':
            statusClass = 'bg-red-100 dark:bg-red-700';
            break;
        }
        html += `
        <tr class="text-gray-700 dark:text-gray-400">
          <td class="px-4 py-3">
            <p class="font-semibold">${promotion['product.name']} (${promotion['product.category']})</p>
          </td>
          <td class="px-4 py-3">
            <p class="font-semibold">${promotion['center.name']} (${promotion['center.city']})</p>
          </td>
          <td class="px-4 py-3 text-sm">
            ${promotion.discount}%
          </td>
          <td class="px-4 py-3 text-sm">
            ${promotion.fidelity} points
          </td>
          <td class="px-4 py-3 text-sm">
            ${promotion.startingDate}
          </td>
          <td class="px-4 py-3 text-sm">
            ${promotion.endingDate}
          </td>
          <td class="px-4 py-3 text-sm">            
            <span class="px-2 py-1 font-semibold leading-tight text-white rounded-full ${statusClass}" >
                ${promotion.status}
             </span>
          </td>
          <td class="px-4 py-3 text-sm">
            ${promotion.comment}
          </td>
        </tr>
      `
      }
    } else {
      html = `<p class="px-4 py-2 text-yellow-500 font-semibold tracking-wide text-left border-b dark:border-gray-700 bg-gray-50 dark:text-yellow-500 dark:bg-gray-800">${data.message}</p>`;
    }
    return html;
  }

  async viewPromotions() {
    return `
      <main class="bg-gray-100 w-full h-screen pt-[5.5rem] overflow-y-auto">
            <div class="container px-10 mx-auto grid">
              <div class="flex justify-between items-center">
                <h2 class="my-6 text-2xl font-semibold text-gray-700">Promotions</h2>
                <a href="/admin/promotions/create" nav-link class="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-indigo-900 border border-transparent rounded-lg active:bg-yellow-500 hover:bg-yellow-500 focus:outline-none focus:shadow-outline-yellow" >
                Create Promotion
                <span class="ml-2">+</span>
                </a>
              </div>
              <div class="w-full overflow-hidden rounded-lg shadow-xs">
              <div class="w-full overflow-x-auto">
                <table class="w-full whitespace-no-wrap">
                  <thead>
                    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                      <th class="px-4 py-3">Product</th>
                      <th class="px-4 py-3">Center</th>
                      <th class="px-4 py-3">Discount</th>
                      <th class="px-4 py-3">Fidelity</th>
                      <th class="px-4 py-3">Starting</th>
                      <th class="px-4 py-3">Ending</th>
                      <th class="px-4 py-3">Status</th>
                      <th class="px-4 py-3">Comment</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    ${await this.getPromotions()}
                  </tbody>
                </table>
              </div>
              
            </div>

            </div>
          </main>
        `
  }

  async viewPromotionCreate() {
    const data = await fetchWithToken('POST', 'http://localhost:4000/admin/products', localStorage.getItem('token'));
    let html = '';
    for (let product of data.products) {
      html += `
        <option value="${product.id}">${product.name} (${product.category})</option>
      `
    }
    return `
      <main class="bg-gray-100 w-full h-screen pt-[5.5rem] overflow-y-auto">
            <div class="container px-10 mx-auto grid">
            <h2 class="my-6 text-2xl text-center font-semibold text-gray-700">Create Promotion</h2>

            <form id="promotion-form" class="px-4 py-3 mb-8 w-1/2 mx-auto bg-white rounded-lg shadow-md dark:bg-indigo-900">
              
              <label class="block mt-4 text-sm">
                <span class="text-gray-700 dark:text-white">
                  Product
                </span>
                <select name="product" id="product" class="block w-full px-3 py-2 mt-3 text-sm dark:text-gray-900 dark:border-gray-600 dark:bg-white rounded-lg focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
                  <option selected hidden disabled value="">Select a product</option>
                  ${html}
                </select>
              </label>

              <label class="block mt-4 text-sm">
                <span class="text-gray-700 dark:text-white">Discount</span>
                <input type="number" name="discount" id="discount" class="block w-full px-3 py-2 mt-3 text-sm dark:border-gray-600 dark:bg-white focus:border-purple-400 rounded-lg focus:outline-none focus:shadow-outline-purple dark:text-gray-900 dark:focus:shadow-outline-gray" placeholder="max 50 (and 20 for multimedia)" min="5" max="50">
              </label>

              <label class="block mt-4 text-sm">
                <span class="text-gray-700 dark:text-white">Starting Date</span>
                <input type="date" name="startingDate" id="startingDate" class="block w-full px-3 py-2 mt-3 text-sm dark:border-gray-600 dark:bg-white focus:border-purple-400 rounded-lg focus:outline-none focus:shadow-outline-purple dark:text-gray-900 dark:focus:shadow-outline-gray" placeholder="manager-exemple@marjane.ma">
              </label>

              <label class="block mt-4 text-sm">
                <span class="text-gray-700 dark:text-white">
                  Duration
                </span>
                <select name="duration" id="duration" class="block w-full px-3 py-2 mt-3 text-sm dark:text-gray-900 dark:border-gray-600 dark:bg-white rounded-lg focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
                  <option selected hidden disabled value="">Select a duration</option>
                  <option value="7">7 days</option>
                  <option value="15">15 days</option>
                  <option value="20">20 days</option>
                </select>
              </label>
              
              <button id="promotion-submit" class="mt-4 flex items-center justify-between w-28 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-800 border border-transparent rounded-lg active:bg-yellow-500 hover:bg-yellow-500 focus:outline-none focus:shadow-outline-yellow">
                Submit
                <span class="material-icons text-sm"> send </span>
              </button>
              <p id="promotion-error" class="input-error text-center font-bold text-red-600"></p>
            </form>
              
            </div>

            </div>
          </main>
        `
  }
}