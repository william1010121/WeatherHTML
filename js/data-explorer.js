/**
 * @fileoverview Logic for fetching and rendering weather data in DataJson-Explorer.
 */

/**
 * Initializes the data explorer page logic.
 */
function initExplorer() {
  const form = document.getElementById('explorer-form');
  if (form) {
    form.addEventListener('submit', handleFetch);
  }
  
  const downloadBtn = document.getElementById('download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', handleDownload);
  }
}

/**
 * Handles the download event.
 */
function handleDownload() {
  const data = window._currentData;
  if (!data) return;

  const year = document.getElementById('year').value;
  const month = document.getElementById('month').value;
  const filename = `weather-data-${year}-${month}.json`;

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}

/**
 * Handles the fetch event.
 * @param {Event} event
 */
async function handleFetch(event) {
  event.preventDefault();
  const year = document.getElementById('year').value;
  const month = document.getElementById('month').value;
  const statusMsg = document.getElementById('status-message');
  const container = document.getElementById('data-container');
  const downloadBtn = document.getElementById('download-btn');

  statusMsg.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700');
  statusMsg.classList.add('bg-blue-100', 'text-blue-700');
  statusMsg.textContent = `Fetching data for ${year}/${month}...`;
  container.innerHTML = '<div class="animate-pulse space-y-4"><div class="h-10 bg-gray-200 rounded"></div><div class="h-10 bg-gray-200 rounded"></div><div class="h-10 bg-gray-200 rounded"></div></div>';
  downloadBtn.disabled = true;

  try {
    const url = `https://tortoise-fluent-rationally.ngrok-free.app/api/60min/json/${year}${month}`;
    const response = await axios.get(url);
    const data = response.data;

    if (!data || (Array.isArray(data) && data.length === 0)) {
      showError('No data found for the selected period.');
      return;
    }

    renderDataList(data);
    statusMsg.classList.replace('bg-blue-100', 'bg-green-100');
    statusMsg.classList.replace('text-blue-700', 'text-green-700');
    statusMsg.textContent = `Successfully loaded ${data.length || 1} data points.`;
    
    // Store data globally for download
    window._currentData = data;
    downloadBtn.disabled = false;
  } catch (error) {
    console.error('Fetch error:', error);
    showError(`Failed to fetch data: ${error.message}. Note: API must be reachable.`);
  }
}

/**
 * Renders the data as a collapsible list.
 * @param {Array|Object} data
 */
function renderDataList(data) {
  const container = document.getElementById('data-container');
  container.innerHTML = '';

  const items = Array.isArray(data) ? data : [data];

  items.forEach((item, index) => {
    const time = item.Time || item.detectedAtUtc || `Record ${index + 1}`;
    const itemEl = document.createElement('div');
    itemEl.className = 'border rounded overflow-hidden mb-2';
    
    itemEl.innerHTML = `
      <button class="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 flex justify-between items-center transition"
              onclick="this.nextElementSibling.classList.toggle('hidden')">
        <span class="font-mono font-semibold text-gray-700">${time}</span>
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div class="hidden p-4 bg-gray-900 border-t">
        <pre class="text-green-400 font-mono text-xs overflow-x-auto">${JSON.stringify(item, null, 2)}</pre>
      </div>
    `;
    container.appendChild(itemEl);
  });
}

/**
 * Shows an error message.
 * @param {string} message
 */
function showError(message) {
  const statusMsg = document.getElementById('status-message');
  const container = document.getElementById('data-container');
  
  statusMsg.classList.remove('hidden', 'bg-blue-100', 'text-blue-700');
  statusMsg.classList.add('bg-red-100', 'text-red-700');
  statusMsg.textContent = message;
  container.innerHTML = '<p class="text-gray-500 italic">Try a different year or month.</p>';
}

// Initialize
document.addEventListener('DOMContentLoaded', initExplorer);

export { initExplorer };
