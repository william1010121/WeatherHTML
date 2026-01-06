# Tech Stack - WeatherHTML Dashboard

## Frontend
- **Framework:** Vanilla HTML/JS with **Tailwind CSS** via CDN for rapid, utility-first styling.
- **Dynamic Navigation:** Client-side JavaScript to parse `swagger.json` and generate the BackEnd sidebar links dynamically.
- **Modularity:** Multi-page architecture using `iframes` for the content area, following a strict file naming convention (`[navbar]-[sidebar].html`).

## API Interaction
- **HTTP Client:** **Axios** for handling all RESTful operations (GET, POST, PUT, DELETE) and authentication requests.
- **Swagger Integration:** Parsing of `swagger.json` to extract paths, methods, and parameters.
- **Data Source (DataJson):** Fetching monthly weather data from an external ngrok-hosted API.
  - *Note: Requires the 'ngrok-skip-browser-warning' header for programmatic access.*

## State & Storage
- **Authentication:** **LocalStorage** for persisting the "Account" and "Password" credentials, making them accessible across all iframe-loaded pages on the same domain.
- **Session Management:** Credentials stored locally and injected into the headers/body of Axios requests as needed.

## Development & Deployment
- **Environment:** Standard local web server or static hosting (e.g., GitHub Pages, Vercel).
- **External Dependencies:**
    - Tailwind CSS (via CDN)
    - Axios (via CDN)
