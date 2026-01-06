# Product Guidelines - WeatherHTML Dashboard

## Visual Identity
- **Style:** Functional & Minimalist. The interface should focus on high contrast, standard HTML form controls, and clean lines to ensure the API interaction and data visualization remain the priority.
- **Color Scheme:** Light Theme. Utilize a clean white background with dark text for maximum legibility of data and JSON strings.
- **Typography:** Use clean, sans-serif system fonts for general interface text and monospaced fonts for JSON data and code snippets.

## Layout & Navigation
- **Top Navbar:** Horizontal bar at the top for switching between major modules (BackEnd, DataJson).
- **Sidebar:** Fixed Sidebar on the left, always visible for quick access to sub-features or API operations.
- **Content Area:** A central `iframe` that occupies the remaining viewport area, loading content from dynamically generated paths.

## Component Behavior
- **Data Display (DataJson):**
    - **Multiple-expand:** Users should be able to open multiple collapsible items simultaneously to compare data points from different dates.
    - **Collapsible Lists:** Default view shows only the date; clicking expands the item to show the full JSON structure.
- **Feedback & Notifications:**
    - **Toast Notifications:** Provide brief, non-intrusive popups in a corner to confirm successful API actions (e.g., "Login Successful", "Data Updated") or report errors.
- **Forms & Inputs:**
    - Consistent placement of "Account" and "Password" fields at the top of all BackEnd pages.
    - Clear labeling for all API parameter inputs.

## Technical Style
- **Modularity:** Adhere strictly to the naming convention `./[navbar]-[sidebar].html`.
- **Vanilla Approach:** Prefer standard HTML5, CSS3, and modern JavaScript (ES6+) for implementation to minimize external dependencies.
