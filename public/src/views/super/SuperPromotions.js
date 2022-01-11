import View from "../AbstractView.js";
import { fetchWithToken } from '../../helpers/fetch.js';

export class SuperPromotions extends View {
  constructor(params) {
    super(params);
    this.setTitle('Promotions');
  }

  async getPromotions() {
    const data = await fetchWithToken('POST', 'http://localhost:4000/super/promotions', localStorage.getItem('token'));
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
              <h2 class="my-6 text-2xl font-semibold text-gray-700">Promotions</h2>

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
}