/**
 * @fileoverview Shared API client logic using Axios and localStorage for auth.
 */

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
 * Checks the current authentication status by calling /api/Account/info.
 */
async function checkAuthStatus() {
  const statusEl = document.getElementById('auth-status');
  if (!statusEl) return;

  const account = localStorage.getItem(STORAGE_KEYS.ACCOUNT);
  const password = localStorage.getItem(STORAGE_KEYS.PASSWORD);

  if (!account || !password) {
    statusEl.textContent = 'Status: Missing Credentials';
    statusEl.className = 'text-xs font-bold text-yellow-600';
    return;
  }

  try {
    const response = await apiRequest('GET', '/api/Account/info');
    console.log('Auth Check Response:', response.status);
    if (response.status === 200) {
      statusEl.textContent = `Status: Logged in as ${response.data.nickname || response.data.account}`;
      statusEl.className = 'text-xs font-bold text-green-600';
    }
  } catch (error) {
    if (error.response?.status === 401) {
      // Try to re-login once if unauthorized
      console.log('Unauthorized, attempting automatic login...');
      try {
        await login(account, password);
        // If login succeeds, the next interval check will update UI to green
      } catch (loginErr) {
        statusEl.textContent = 'Status: Login Failed';
        statusEl.className = 'text-xs font-bold text-red-600';
      }
    } else {
      console.error('Auth Check Error:', error.response?.status, error.message);
      statusEl.textContent = 'Status: Error';
      statusEl.className = 'text-xs font-bold text-red-600';
    }
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

// Set global base URL for Axios
axios.defaults.baseURL = 'https://meteo.local2.tempestdigi.com';
// Ensure cookies are sent with every request
axios.defaults.withCredentials = true;

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

// Auto-initialize if running in a page context with auth inputs
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApiClient);
} else {
  initApiClient();
}

export { apiRequest, getAuthHeaders, STORAGE_KEYS };
