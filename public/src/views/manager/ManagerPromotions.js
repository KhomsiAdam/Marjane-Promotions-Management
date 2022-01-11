import View from "../AbstractView.js";
import { fetchWithToken } from '../../helpers/fetch.js';

export class ManagerPromotions extends View {
  constructor(params) {
    super(params);
    this.setTitle('Promotions');
  }

  async getPromotions() {
    const data = await fetchWithToken('POST', 'http://localhost:4000/manager/promotions', localStorage.getItem('token'));
    let html = '';
    let statusClass;
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
          <td class="px-4 py-3">
            <a class="flex items-center justify-center px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit" href="/manager/promotion/${promotion.id}" nav-link>
              <span class="material-icons">edit</span>
            </a>
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
                      <th class="px-4 py-3">Actions</th>
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

  async viewPromotionUpdate() {
    const data = await fetchWithToken('POST', `http://localhost:4000/manager/promotion/${this.params.id}`, localStorage.getItem('token'));
    console.log(data);
    if (data && data.promotion) {
      return `
      <main class="bg-gray-100 w-full h-screen pt-[5.5rem] overflow-y-auto">
            <div class="container px-10 mx-auto grid">
            <h2 class="my-6 text-2xl text-center font-semibold text-gray-700">Update Promotion</h2>

            <form id="update-form" class="px-4 py-3 mb-8 w-1/2 mx-auto bg-white rounded-lg shadow-md dark:bg-indigo-900">
              
              <label class="block mt-4 text-sm">
                <span class="text-gray-700 dark:text-white">
                  Status
                </span>
                <select name="status" id="status" class="block w-full px-3 py-2 mt-3 text-sm dark:text-gray-900 dark:border-gray-600 dark:bg-white rounded-lg focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
                  <option selected hidden disabled value="">Select a status</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Refused">Refused</option>
                </select>
              </label>

              <label class="block mt-4 text-sm">
                <span class="text-gray-700 dark:text-white">Comment</span>
                <input type="text" name="comment" id="comment" class="block w-full px-3 py-2 mt-3 text-sm dark:border-gray-600 dark:bg-white focus:border-purple-400 rounded-lg focus:outline-none focus:shadow-outline-purple dark:text-gray-900 dark:focus:shadow-outline-gray">
              </label>

              <label class="block mt-4 text-sm">
                <span class="text-gray-700 dark:text-white">Current Stock</span>
                <input type="number" name="stock" id="stock" class="block w-full px-3 py-2 mt-3 text-sm dark:border-gray-600 dark:bg-white focus:border-purple-400 rounded-lg focus:outline-none focus:shadow-outline-purple dark:text-gray-900 dark:focus:shadow-outline-gray">
              </label>
              
              <button id="update-submit" value="${data.promotion.id}" class="mt-4 flex items-center justify-between w-28 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-800 border border-transparent rounded-lg active:bg-yellow-500 hover:bg-yellow-500 focus:outline-none focus:shadow-outline-yellow">
                Submit
                <span class="material-icons text-sm"> send </span>
              </button>
              <p id="update-error" class="input-error text-center font-bold text-red-600"></p>
            </form>
              
            </div>

            </div>
          </main>
        `
    } else {
    return `
      <main class="bg-gray-100 w-full h-screen pt-[5.5rem] overflow-y-auto">
        <div class="container px-10 mx-auto grid">
          <h2 class="my-6 text-2xl text-center font-semibold text-gray-700">There is no promotion available with this id.</h2>        
        </div>
    </main>
    `
    }

  }
}