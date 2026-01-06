# Spec: Dashboard Architecture

## Overview
A two-level navigation dashboard that integrates a backend API (via Swagger) and a weather data JSON explorer.

## Components

### 1. Main Shell (`index.html`)
- **Top Navbar:** Switches between "BackEnd" and "DataJson".
- **Sidebar:** Fixed container that updates based on the Navbar selection.
- **Content Area:** `iframe` for loading specific operation pages.

### 2. BackEnd Module
- **Parsing:** Reads `./swagger.json` to extract tags (as sidebar groups) and operations (as sidebar items).
- **Naming Convention:** Links to `./BackEnd-[OperationName].html`.
- **Authentication:** All BackEnd pages share Account/Password inputs at the top, stored in `localStorage`.

### 3. DataJson Module
- **Sidebar:** Contains a single item or a small set of fixed views.
- **Data Viewer:** `DataJson-Explorer.html`.
- **Interface:** Inputs for [Year] and [Month].
- **Data Fetching:** GET `https://tortoise-fluent-rationally.ngrok-free.app/api/60min/json/[year][month]`.
- **List Rendering:** Collapsible items showing Time/Hour. Multiple items can be expanded.
- **Download:** Button to download the full monthly JSON.

### 4. Shared Logic
- **Tailwind CSS:** Used for all styling (via CDN).
- **Axios:** Used for all API requests.
- **localStorage:** Shared state for authentication.

## File Structure (Planned)
- `index.html`: Main dashboard.
- `js/main.js`: Navigation and shell logic.
- `js/swagger-parser.js`: Logic to handle `swagger.json`.
- `js/api-client.js`: Shared Axios configuration.
- `BackEnd-[Operation].html`: Generated/Static pages for each API operation.
- `DataJson-Explorer.html`: Main page for data visualization.
