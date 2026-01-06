/**
 * @fileoverview Logic to parse swagger.json and build the BackEnd sidebar.
 */

/**
 * Fetches and parses swagger.json to build the sidebar.
 * @return {Promise<void>}
 */
async function buildBackendSidebar() {
  const sidebarContent = document.getElementById('sidebar-content');
  
  try {
    const response = await fetch('./swagger.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch swagger.json: ${response.statusText}`);
    }
    const spec = await response.json();
    const tags = {};

    // Group operations by tags
    Object.entries(spec.paths).forEach(([path, methods]) => {
      Object.entries(methods).forEach(([method, op]) => {
        const tag = (op.tags && op.tags[0]) || 'Default';
        if (!tags[tag]) {
          tags[tag] = [];
        }
        
        // Extract a clean name for the operation
        const opName = op.operationId || 
                       `${method.toUpperCase()} ${path.split('/').pop()}`;
        
        tags[tag].push({
          path,
          method: method.toUpperCase(),
          name: opName,
          summary: op.summary || '',
        });
      });
    });

    // Render the sidebar
    renderSidebar(tags);
  } catch (error) {
    console.error('Error building sidebar:', error);
    sidebarContent.innerHTML = `
      <div class="text-red-500 p-4">
        <p class="font-bold">Error loading sidebar</p>
        <p class="text-sm">${error.message}</p>
      </div>
    `;
  }
}

/**
 * Renders the grouped tags and operations into the sidebar.
 * @param {Object<string, Array>} tags
 */
function renderSidebar(tags) {
  const sidebarContent = document.getElementById('sidebar-content');
  let html = '<h2 class="text-lg font-bold mb-4">BackEnd Operations</h2>';

  // Define unified resource pages
  const unifiedPages = {
    'User': 'BackEnd-User.html',
    'Weather_Auto': 'BackEnd-Weather_Auto.html',
    'Weather_Manual': 'BackEnd-Weather_Manual.html',
    'Weather_CWA': 'BackEnd-Weather_CWA.html',
    'AirQuality': 'BackEnd-AirQuality.html'
  };

  Object.keys(tags).sort().forEach(tag => {
    html += `
      <div class="mb-4">
        <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">${tag}</h3>
        <ul class="space-y-1">
    `;

    if (unifiedPages[tag]) {
      // Render a single management link for unified resources
      html += `
        <li>
          <a href="${unifiedPages[tag]}" target="content-frame"
             class="block p-2 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 rounded font-medium transition">
            <span class="inline-block w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
            Manage ${tag}
          </a>
        </li>
      `;
    } else {
      // Render individual operations for other resources
      tags[tag].forEach(op => {
        // Create a URL-friendly name for the operation file
        const safeName = op.name.replace(/[^a-z0-9]/gi, '-');
        const href = `BackEnd-Generic.html?method=${op.method}&path=${encodeURIComponent(op.path)}&name=${encodeURIComponent(op.name)}`;

        html += `
          <li>
            <a href="${href}" target="content-frame" title="${op.summary}"
               class="block p-2 text-sm hover:bg-gray-100 rounded text-gray-700 hover:text-blue-600 transition truncate">
              <span class="font-mono text-xs font-bold mr-1 ${getMethodColor(op.method)}">${op.method}</span>
              ${op.name}
            </a>
          </li>
        `;
      });
    }

    html += '</ul></div>';
  });

  sidebarContent.innerHTML = html;
}

/**
 * Gets the Tailwind color class for an HTTP method.
 * @param {string} method
 * @return {string}
 */
function getMethodColor(method) {
  switch (method.toUpperCase()) {
    case 'GET': return 'text-green-600';
    case 'POST': return 'text-blue-600';
    case 'PUT': return 'text-yellow-600';
    case 'PATCH': return 'text-purple-600';
    case 'DELETE': return 'text-red-600';
    default: return 'text-gray-600';
  }
}

export { buildBackendSidebar };
