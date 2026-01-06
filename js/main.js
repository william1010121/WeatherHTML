/**
 * @fileoverview Main navigation logic for the Weather Dashboard shell.
 */

/**
 * Initializes the dashboard navigation.
 */
function initNavigation() {
  const navBackend = document.getElementById('nav-backend');
  const navDataJson = document.getElementById('nav-datajson');
  const sidebarContent = document.getElementById('sidebar-content');

  if (!navBackend || !navDataJson || !sidebarContent) {
    console.error('Navigation elements not found');
    return;
  }

  navBackend.addEventListener('click', () => {
    setActiveNav(navBackend, [navDataJson]);
    loadBackendSidebar();
  });

  navDataJson.addEventListener('click', () => {
    setActiveNav(navDataJson, [navBackend]);
    loadDataJsonSidebar();
  });
}

/**
 * Sets the active state for a navigation button.
 * @param {HTMLElement} activeBtn
 * @param {HTMLElement[]} inactiveBtns
 */
function setActiveNav(activeBtn, inactiveBtns) {
  activeBtn.classList.add('bg-blue-800');
  activeBtn.classList.remove('hover:bg-blue-700');
  
  inactiveBtns.forEach(btn => {
    btn.classList.remove('bg-blue-800');
    btn.classList.add('hover:bg-blue-700');
  });
}

/**
 * Loads the placeholder sidebar for the BackEnd module.
 */
function loadBackendSidebar() {
  const sidebarContent = document.getElementById('sidebar-content');
  sidebarContent.innerHTML = `
    <h2 class="text-lg font-bold mb-4">BackEnd Operations</h2>
    <p class="text-sm text-gray-600 mb-2">Loading operations from swagger.json...</p>
    <ul class="space-y-2">
      <li class="p-2 bg-gray-100 rounded animate-pulse h-8"></li>
      <li class="p-2 bg-gray-100 rounded animate-pulse h-8"></li>
      <li class="p-2 bg-gray-100 rounded animate-pulse h-8"></li>
    </ul>
  `;
}

/**
 * Loads the sidebar for the DataJson module.
 */
function loadDataJsonSidebar() {
  const sidebarContent = document.getElementById('sidebar-content');
  sidebarContent.innerHTML = `
    <h2 class="text-lg font-bold mb-4">DataJson Explorer</h2>
    <ul class="space-y-2">
      <li>
        <a href="DataJson-Explorer.html" target="content-frame" class="block p-2 hover:bg-blue-50 rounded text-blue-600 font-medium">
          Monthly Data Viewer
        </a>
      </li>
    </ul>
  `;
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', initNavigation);

export { initNavigation };
