export class Header extends HTMLElement {
  connectedCallback() {
    if (location.pathname.split('/')[1] === 'super' && localStorage.getItem('token') && localStorage.getItem('role')) {
      this.innerHTML = `
        <header class="z-10 py-4 bg-indigo-900 fixed w-full">
          <div class="hidden m768:flex items-center justify-between h-full container px-10 mx-auto text-indigo-900">
            <div>
              <img class="w-28" src="/images/logo-marjane.png" alt="Marjane Logo">
            </div>

          <ul class="py-1 flex items-center justify-between text-gray-500 dark:text-gray-400">
            <li class="relative px-2">
              <a class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-yellow-500 hover:text-white px-3 py-2 rounded-md" href="/super/dashboard" nav-link>
                Dashboard
              </a>
            </li>
            <li class="relative px-2">
              <a class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-yellow-500 hover:text-white px-3 py-2 rounded-md" href="/super/centers" nav-link>
                Centers
              </a>
            </li>
            <li class="relative px-2">
              <a class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-yellow-500 hover:text-white px-3 py-2 rounded-md" href="/super/admins" nav-link>
                Admins
              </a>
            </li>
            <li class="relative px-2">
              <a class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-yellow-500 hover:text-white px-3 py-2 rounded-md" href="/super/products" nav-link>
                Products
              </a>
            </li>
            <li class="relative px-2">
              <a class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-yellow-500 hover:text-white px-3 py-2 rounded-md" href="/super/promotions" nav-link>
                Promotions
              </a>
            </li>
            
          </ul>
            <button id="logout" class="flex items-center justify-between w-28 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-800 border border-transparent rounded-lg active:bg-yellow-500 hover:bg-yellow-500 focus:outline-none focus:shadow-outline-yellow">
              <span>Logout</span>
              <span class="material-icons pl-2 text-sm">logout</span>
            </button>
          </div>

        <div class="flex m768:hidden items-center justify-between h-full container px-10 mx-auto text-indigo-900">
        <div>
              <img class="w-28" src="/images/logo-marjane.png" alt="Marjane Logo">
            </div>

        <button type="button" class="m768:hidden bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                  <span class="sr-only">Open main menu</span>
                  <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
        </div>
        <div id="mobile-nav" class="hidden flex-col m768:hidden items-center justify-between h-full container px-10 mx-auto text-indigo-900">

          <ul class="py-1 flex items-center justify-between text-gray-500 dark:text-gray-400">
            <li class="relative px-2">
              <a class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-yellow-500 hover:text-white px-3 py-2 rounded-md" href="/super/dashboard" nav-link>
                Dashboard
              </a>
            </li>
            <li class="relative px-2">
              <a class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-yellow-500 hover:text-white px-3 py-2 rounded-md" href="/super/centers" nav-link>
                Centers
              </a>
            </li>
            <li class="relative px-2">
              <a class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-yellow-500 hover:text-white px-3 py-2 rounded-md" href="/super/admins" nav-link>
                Admins
              </a>
            </li>
            <li class="relative px-2">
              <a class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-yellow-500 hover:text-white px-3 py-2 rounded-md" href="/super/products" nav-link>
                Products
              </a>
            </li>
            <li class="relative px-2">
              <a class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-yellow-500 hover:text-white px-3 py-2 rounded-md" href="/super/promotions" nav-link>
                Promotions
              </a>
            </li>
            
          </ul>
            <button id="logout" class="flex items-center justify-between w-28 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-800 border border-transparent rounded-lg active:bg-yellow-500 hover:bg-yellow-500 focus:outline-none focus:shadow-outline-yellow">
              <span>Logout</span>
              <span class="material-icons pl-2 text-sm">logout</span>
            </button>
          </div>
          </div>
        </header>
        `;
    } else if (location.pathname.split('/')[1] === 'admin' && localStorage.getItem('token') && localStorage.getItem('role')) {
      this.innerHTML = `
      <header class="z-10 py-4 bg-indigo-900 fixed w-full">
        <div class="flex items-center justify-between h-full container px-10 mx-auto text-indigo-900">
          <div>
            <img class="w-28" src="/images/logo-marjane.png" alt="Marjane Logo">
          </div>

        <ul class="py-1 flex items-center justify-between text-gray-500 dark:text-gray-400">
          <li class="relative px-2">
            <a class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-yellow-500 hover:text-white px-3 py-2 rounded-md" href="/admin/dashboard" nav-link>
              Dashboard
            </a>
          </li>
          <li class="relative px-2">
            <a class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-yellow-500 hover:text-white px-3 py-2 rounded-md" href="/admin/managers" nav-link>
              Managers
            </a>
          </li>
          <li class="relative px-2">
            <a class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-yellow-500 hover:text-white px-3 py-2 rounded-md" href="/admin/products" nav-link>
              Products
            </a>
          </li>
          <li class="relative px-2">
            <a class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-yellow-500 hover:text-white px-3 py-2 rounded-md" href="/admin/promotions" nav-link>
              Promotions
            </a>
          </li>
          
        </ul>
          <button id="logout" class="flex items-center justify-between w-28 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-800 border border-transparent rounded-lg active:bg-yellow-500 hover:bg-yellow-500 focus:outline-none focus:shadow-outline-yellow">
            <span>Logout</span>
            <span class="material-icons pl-2 text-sm">logout</span>
          </button>
        </div>
      </header>
      `;
    } else if (location.pathname.split('/')[1] === 'manager' && localStorage.getItem('token') && localStorage.getItem('role')) {
      this.innerHTML = `
      <header class="z-10 py-4 bg-indigo-900 fixed w-full">
        <div class="flex items-center justify-between h-full container px-10 mx-auto text-indigo-900">
          <div>
            <img class="w-28" src="/images/logo-marjane.png" alt="Marjane Logo">
          </div>

        <ul class="py-1 flex items-center justify-between text-gray-500 dark:text-gray-400">
          <li class="relative px-2">
            <a class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-yellow-500 hover:text-white px-3 py-2 rounded-md" href="/manager/dashboard" nav-link>
              Dashboard
            </a>
          </li>
          <li class="relative px-2">
            <a class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-yellow-500 hover:text-white px-3 py-2 rounded-md" href="/manager/products" nav-link>
              Products
            </a>
          </li>
          <li class="relative px-2">
            <a class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 hover:bg-yellow-500 hover:text-white px-3 py-2 rounded-md" href="/manager/promotions" nav-link>
              Promotions
            </a>
          </li>
          
        </ul>
          <button id="logout" class="flex items-center justify-between w-28 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-800 border border-transparent rounded-lg active:bg-yellow-500 hover:bg-yellow-500 focus:outline-none focus:shadow-outline-yellow">
            <span>Logout</span>
            <span class="material-icons pl-2 text-sm">logout</span>
          </button>
        </div>
      </header>
      `;
    }
  }
}

customElements.define('header-component', Header);