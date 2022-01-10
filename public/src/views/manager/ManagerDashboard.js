import View from "../AbstractView.js";
import { fetchWithToken } from '../../helpers/fetch.js';

export class ManagerDashboard extends View {
  constructor(params) {
    super(params);
    this.setTitle('Dashboard');
  }

  async viewDashboard() {
    // const data = await fetchWithToken('POST', 'http://localhost:4000/admin/count', localStorage.getItem('token'));
    // const staff = data.admins + data.managers;
    return `
      <main class="bg-gray-100 w-full h-screen pt-[5.5rem] overflow-y-auto">
            <div class="container px-10 mx-auto grid">
              <h2 class="my-6 text-2xl font-semibold text-gray-700">Dashboard</h2>
              <!-- Cards -->
              <div class="grid gap-6 m768:grid-cols-2 m1280:grid-cols-4">
              <!-- Card -->
              <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                <div class="w-12 p-3 mr-4 grid text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                <span class="material-icons"> store </span> </div>
                <div>
                  <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Stores
                  </p>
                  <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    1
                  </p>
                </div>
              </div>
              <!-- Card -->
              <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                <div class="w-12 p-3 mr-4 grid text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
                <span class="material-icons"> shopping_cart </span>
                </div>
                <div>
                  <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Products
                  </p>
                  <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    1
                  </p>
                </div>
              </div>
              <!-- Card -->
              <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                <div class="w-12 p-3 mr-4 grid text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
                <span class="material-icons"> shopping_cart </span>
                </div>
                <div>
                  <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Promotions
                  </p>
                  <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    1
                  </p>
                </div>
              </div>
              <!-- Card -->
              <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                <div class="w-12 p-3 mr-4 grid text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
                <span class="material-icons"> people </span>
                </div>
                <div>
                  <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Staff
                  </p>
                  <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    1
                  </p>
                </div>
              </div>
            </div>

            <h2 class="my-6 text-2xl font-semibold text-gray-700">
              Charts
            </h2>

            <div class="grid gap-6 mb-8 m768:grid-cols-2">
              <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                  Promotions
                </h4>
                <canvas id="pie" style="display: block; width: 306px; height: 153px;" width="306" height="153" class="chartjs-render-monitor"></canvas>
                <div class="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
                  <!-- Chart legend -->
                  <div class="flex items-center">
                    <span class="inline-block w-3 h-3 mr-1 bg-yellow-600 rounded-full"></span>
                    <span>Pending</span>
                  </div>
                  <div class="flex items-center">
                    <span class="inline-block w-3 h-3 mr-1 bg-green-600 rounded-full"></span>
                    <span>Accepted</span>
                  </div>
                  <div class="flex items-center">
                    <span class="inline-block w-3 h-3 mr-1 bg-orange-600 rounded-full"></span>
                    <span>Refused</span>
                  </div>
                  <div class="flex items-center">
                    <span class="inline-block w-3 h-3 mr-1 bg-red-600 rounded-full"></span>
                    <span>Untreated</span>
                  </div>
                </div>
              </div>
              <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                  Staff
                </h4>
                <canvas id="line" style="display: block; width: 305px; height: 152px;" width="305" height="152" class="chartjs-render-monitor"></canvas>
                <div class="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
                  <!-- Chart legend -->
                  <div class="flex items-center">
                    <span class="inline-block w-3 h-3 mr-1 bg-teal-600 rounded-full"></span>
                    <span>Admins</span>
                  </div>
                  <div class="flex items-center">
                    <span class="inline-block w-3 h-3 mr-1 bg-purple-600 rounded-full"></span>
                    <span>Managers</span>
                  </div>
                </div>
              </div>
            </div>

            </div>
          </main>
        `
  }
}