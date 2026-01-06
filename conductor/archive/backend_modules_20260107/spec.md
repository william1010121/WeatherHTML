# Spec: Backend Resource Modules

## Overview
Transform the BackEnd module from a placeholder template into a set of functional, resource-centric pages. This involves creating unified CRUD interfaces for priority resources and a dynamic generic page for other operations.

## Functional Requirements

### 1. Unified Resource Pages
For the following resources, create a single HTML file that handles all CRUD operations (List, Add, Update, Delete):
- **User Management** (`BackEnd-User.html`)
- **Weather Data** (`BackEnd-Weather_Auto.html`, `BackEnd-Weather_Manual.html`, `BackEnd-Weather_CWA.html`)
- **Air Quality** (`BackEnd-AirQuality.html`)

**Each page must include:**
- A **Data Table** to display the results of the 'List' operation.
- **Action Buttons** (Edit, Delete) within each table row.
- An **"Add New" Button** that opens a form (modal or inline).
- **Interactive Forms** that handle validation and execution of POST/PUT/DELETE requests via `api-client.js`.

### 2. Sidebar Consolidation
Update `js/swagger-parser.js` to:
- Group operations by Resource (Tag).
- For prioritized resources, display only a single "Management" link in the sidebar that points to the unified page.
- For other resources (e.g., Account, Log), maintain individual operation links or route them to a dynamic generic page.

### 3. Dynamic Generic Page (`BackEnd-Generic.html`)
- A catch-all page based on the `BackEnd-Template.html` that can be populated dynamically if a specific unified page does not exist.

### 4. Shared Integration
- Continue using `localStorage` for authentication via `api-client.js`.
- Ensure all pages include the `ngrok-skip-browser-warning` header.

## Acceptance Criteria
- [ ] Clicking "User" in the sidebar opens a page showing a list of users with CRUD options.
- [ ] Weather and AirQuality modules are similarly consolidated and functional.
- [ ] The sidebar no longer lists 5-6 redundant links for a single resource.
- [ ] Authentication state persists correctly across all new pages.
