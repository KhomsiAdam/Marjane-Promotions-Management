import View from "../AbstractView.js";
import { fetchWithToken } from '../../helpers/fetch.js';

export class AdminManagersList extends View {
  constructor(params) {
    super(params);
    this.setTitle('Managers');
  }

  async viewManagers() {
    const data = await fetchWithToken('POST', 'http://localhost:4000/admin/managers', localStorage.getItem('token'));
    let html = '';
    if (data.managers && data.managers.length > 0) {
      for (let manager of data.managers) {
        html += `
        <tr class="text-gray-700 dark:text-gray-400">
          <td class="px-4 py-3">
            <div class="flex items-center text-sm">
                <p class="font-semibold">${manager.email}</p>
            </div>
          </td>
          <td class="px-4 py-3 text-sm">
            ${manager.category}
          </td>
          <td class="px-4 py-3 text-sm">
            ${manager['center.name']}
          </td>
          <td class="px-4 py-3 text-sm">
            ${manager['center.city']}
          </td>
          <td class="px-4 py-3 text-sm">
            ${manager.createdAt}
          </td>
          <td class="px-4 py-3">
            <div class="flex items-center justify-center space-x-4 text-sm">
              <button value="${manager.id}" class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                </svg>
              </button>
              <button value="${manager.id}" class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
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
            <h2 class="my-6 text-2xl font-semibold text-gray-700">Managers</h2>

            <a href="/admin/managers/create" nav-link class="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-indigo-900 border border-transparent rounded-lg active:bg-yellow-500 hover:bg-yellow-500 focus:outline-none focus:shadow-outline-yellow" >
              Create Manager
              <span class="ml-2">+</span>
            </a>
          </div>

          <div class="w-full overflow-hidden rounded-lg shadow-xs">
          <div class="w-full overflow-x-auto">
            <table class="w-full whitespace-no-wrap">
              <thead>
                <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th class="px-4 py-3">Manager</th>
                  <th class="px-4 py-3">Category</th>
                  <th class="px-4 py-3">Center</th>
                  <th class="px-4 py-3">City</th>
                  <th class="px-4 py-3">Created</th>
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

  async viewManagerCreate() {
    const data = await fetchWithToken('POST', 'http://localhost:4000/admin/centers', localStorage.getItem('token'));
    let html = '';
    for (let center of data.centers) {
      html += `
        <option value="${center.id}">${center.name} (${center.city})</option>
      `
    }
    return `
      <main class="bg-gray-100 w-full h-screen pt-[5.5rem] overflow-y-auto">
            <div class="container px-10 mx-auto grid">
            <h2 class="my-6 text-2xl text-center font-semibold text-gray-700">Create Manager</h2>

            <form id="manager-form" class="px-4 py-3 mb-8 w-1/2 mx-auto bg-white rounded-lg shadow-md dark:bg-indigo-900">
              <label class="block text-sm">
                <span class="text-gray-700 dark:text-white">Email</span>
                <input type="email" name="email" id="email" class="block w-full px-3 py-2 mt-3 text-sm dark:border-gray-600 dark:bg-white focus:border-purple-400 rounded-lg focus:outline-none focus:shadow-outline-purple dark:text-gray-900 dark:focus:shadow-outline-gray" placeholder="manager-exemple@marjane.ma">
              </label>

              <label class="block mt-4 text-sm">
                <span class="text-gray-700 dark:text-white">
                  Category
                </span>
                <select name="category" id="category" class="block w-full px-3 py-2 mt-3 text-sm dark:text-gray-900 dark:border-gray-600 dark:bg-white rounded-lg focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
                  <option selected hidden disabled value="">Select a category</option>
                  <option value="Multimedia">Multimedia</option>
                  <option value="Candy">Candy</option>
                </select>
              </label>

              <label class="block mt-4 text-sm">
                <span class="text-gray-700 dark:text-white">
                  Center
                </span>
                <select name="center" id="center" class="block w-full px-3 py-2 mt-3 text-sm dark:text-gray-900 dark:border-gray-600 dark:bg-white rounded-lg focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
                  <option selected hidden disabled value="">Select a center</option>
                  ${html}
                </select>
              </label>

              <button id="manager-submit" class="mt-4 flex items-center justify-between w-28 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-800 border border-transparent rounded-lg active:bg-yellow-500 hover:bg-yellow-500 focus:outline-none focus:shadow-outline-yellow">
                Submit
                <span class="material-icons text-sm"> send </span>
              </button>
              <p id="manager-error" class="input-error text-center font-bold text-red-600"></p>
            </form>
              
            </div>

            </div>
          </main>
        `
  }
}