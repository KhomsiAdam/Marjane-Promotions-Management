import { initForms } from './forms.js';
import { access } from './access.js';
// Basic Views
import { Login, NotFound } from './views/index.js';
// Super Views
import { SuperLogin, SuperDashboard, SuperAdminsList, SuperCenters, SuperProducts, SuperPromotions } from './views/super/index.js';
// Admin Views
import { AdminDashboard, AdminProducts, AdminPromotions, AdminManagersList } from './views/admin/index.js';
// Manager Views
import { ManagerDashboard, ManagerProducts, ManagerPromotions } from './views/manager/index.js';

// Regex for path
const pathToRegex = path => new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

// Get params from url
const getParams = match => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

  return Object.fromEntries(keys.map((key, i) => {
    return [key, values[i]];
  }));
};

// Router
export const router = async () => {
  const routes = [
    // Basic Routes
    { path: '/404', view: NotFound, method: 'viewNotFound' },
    { path: '/', view: Login, method: 'viewLogin' },
    // SuperAdmin Routes
    { path: '/super', view: SuperLogin, method: 'viewSuperLogin' },
    { path: '/super/dashboard', view: SuperDashboard, method: 'viewDashboard' },
    { path: '/super/dashboard/logs', view: SuperDashboard, method: 'viewLogs' },
    { path: '/super/centers', view: SuperCenters, method: 'viewCenters' },
    { path: '/super/admins', view: SuperAdminsList, method: 'viewAdmins' },
    { path: '/super/admins/create', view: SuperAdminsList, method: 'viewAdminCreate' },
    { path: '/super/products', view: SuperProducts, method: 'viewProducts' },
    { path: '/super/promotions', view: SuperPromotions, method: 'viewPromotions' },
    // Admin Routes
    { path: '/admin/dashboard', view: AdminDashboard, method: 'viewDashboard' },
    { path: '/admin/managers', view: AdminManagersList, method: 'viewManagers' },
    { path: '/admin/managers/create', view: AdminManagersList, method: 'viewManagerCreate' },
    { path: '/admin/products', view: AdminProducts, method: 'viewProducts' },
    { path: '/admin/promotions', view: AdminPromotions, method: 'viewPromotions' },
    { path: '/admin/promotions/create', view: AdminPromotions, method: 'viewPromotionCreate' },
    // Manager Routes
    { path: '/manager/dashboard', view: ManagerDashboard, method: 'viewDashboard' },
    { path: '/manager/products', view: ManagerProducts, method: 'viewProducts' },
    { path: '/manager/promotions', view: ManagerPromotions, method: 'viewPromotions' },
    { path: '/manager/promotion/:id', view: ManagerPromotions, method: 'viewPromotionUpdate' },
  ];

  // Get matching route
  const matchRoutes = routes.map(route => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path))
    }
  })

  let match = matchRoutes.find(matchRoute => matchRoute.result !== null);

  // If there is no matching route, show "not found" view
  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname]
    }
  }

  // Init View
  const view = new match.route.view(getParams(match));

  // Render View
  document.querySelector('#app').innerHTML = await view[match.route.method]();
  // Initialize forms if they exist
  initForms();

  // Manage route access depending on token, role, current route
  access();
}