/**
 * @fileoverview Shared API client logic using Axios and localStorage for auth.
 */

// Set global base URL to the local CORS proxy
axios.defaults.baseURL = 'http://localhost:8000';
// Ensure cookies are sent with every request
axios.defaults.withCredentials = true;

const STORAGE_KEYS = {
  ACCOUNT: 'weather_dashboard_account',
  PASSWORD: 'weather_dashboard_password',
};

/**
 * Initializes the API client and shared auth UI logic.
 */
function initApiClient() {
  loadAuthFromStorage();
  setupAuthListeners();
  
  // Initial check and set interval for status
  checkAuthStatus();
  setInterval(checkAuthStatus, 10000);
}

/**
 * Checks the current authentication status by calling /api/Account/info.
 */
async function checkAuthStatus() {
  const account = localStorage.getItem(STORAGE_KEYS.ACCOUNT);
  const password = localStorage.getItem(STORAGE_KEYS.PASSWORD);

  if (!account || !password) {
    renderAuthStatus('Missing Credentials', 'text-yellow-600');
    return;
  }

  try {
    const response = await apiRequest('GET', '/api/Account/info');
    if (response.status === 200) {
      renderAuthStatus(`Logged in as ${response.data.nickname || response.data.account}`, 'text-green-600');
    }
  } catch (error) {
    // Attempt auto-login if unauthorized and we haven't just tried
    if (error.response?.status === 401 && !window._isLoggingIn) {
       window._isLoggingIn = true;
       console.log('Unauthorized, attempting automatic login...');
       try {
         await login(account, password);
         window._isLoggingIn = false;
         // Recursively check status again after successful login
         return checkAuthStatus(); 
       } catch (loginErr) {
         window._isLoggingIn = false;
         // Fall through to error display if login fails
       }
    }

    const status = error.response?.status || 'Unknown';
    const statusText = error.response?.statusText || error.message;
    const errorData = error.response?.data ? JSON.stringify(error.response.data) : '';
    
    console.error('Auth Check Error:', status, statusText, errorData);
    
    let displayMsg = `Error ${status}: ${statusText}`;
    if (error.response?.data?.title) displayMsg = `Error ${status}: ${error.response.data.title}`;
    
    renderAuthStatus(displayMsg, 'text-red-600', true);
  }
}

/**
 * Renders the authentication status in the UI.
 * @param {string} message
 * @param {string} colorClass
 * @param {boolean} [showRetry=false]
 */
function renderAuthStatus(message, colorClass, showRetry = false) {
  const statusEl = document.getElementById('auth-status');
  if (!statusEl) return;

  let html = `Status: <span class="${colorClass}">${message}</span>`;
  if (showRetry) {
    html += ` <button onclick="window.checkAuthStatus()" class="ml-2 px-2 py-0.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-[10px] font-bold transition cursor-pointer">Retry</button>`;
  }
  statusEl.innerHTML = html;
}

/**
 * Loads account and password from localStorage into the UI.
 */
function loadAuthFromStorage() {
  const accountInput = document.getElementById('auth-account');
  const passwordInput = document.getElementById('auth-password');

  if (accountInput) {
    accountInput.value = localStorage.getItem(STORAGE_KEYS.ACCOUNT) || '';
  }
  if (passwordInput) {
    passwordInput.value = localStorage.getItem(STORAGE_KEYS.PASSWORD) || '';
  }
}

/**
 * Listens for changes in auth inputs and saves them to localStorage.
 */
function setupAuthListeners() {
  const accountInput = document.getElementById('auth-account');
  const passwordInput = document.getElementById('auth-password');

  if (accountInput) {
    accountInput.addEventListener('input', (e) => {
      localStorage.setItem(STORAGE_KEYS.ACCOUNT, e.target.value);
    });
  }
  if (passwordInput) {
    passwordInput.addEventListener('input', (e) => {
      localStorage.setItem(STORAGE_KEYS.PASSWORD, e.target.value);
    });
  }
}

/**
 * Performs a login request.
 * @param {string} account
 * @param {string} password
 * @return {Promise<Object>}
 */
async function login(account, password) {
  return await apiRequest('POST', '/api/Account/login', { account, password });
}

/**
 * Gets the current authentication headers.
 * @return {Object}
 */
function getAuthHeaders() {
  const account = localStorage.getItem(STORAGE_KEYS.ACCOUNT) || '';
  const password = localStorage.getItem(STORAGE_KEYS.PASSWORD) || '';
  
  return {
    'X-Account': account,
    'X-Password': password,
    'ngrok-skip-browser-warning': 'true',
  };
}

/**
 * Performs a request with auth headers.
 * @param {string} method
 * @param {string} url
 * @param {Object} [data=null]
 * @param {Object} [params=null]
 * @return {Promise<Object>}
 */
async function apiRequest(method, url, data = null, params = null) {
  try {
    const response = await axios({
      method,
      url,
      data,
      params,
      headers: getAuthHeaders(),
    });
    return response;
  } catch (error) {
    console.error(`API Request Error (${method} ${url}):`, error);
    throw error;
  }
}

// Expose checkAuthStatus to window for retry button
window.checkAuthStatus = checkAuthStatus;

// Auto-initialize if running in a page context with auth inputs
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApiClient);
} else {
  initApiClient();
}

export { apiRequest, getAuthHeaders, STORAGE_KEYS };