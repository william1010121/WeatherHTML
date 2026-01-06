# Product Guide - WeatherHTML Dashboard

## Initial Concept
實作一個具備二階連動導覽的 HTML 頁面，點選頂部導覽列後切換側邊欄清單，並依據兩者 ID 組合自動生成路徑並以 iframe 載入對應的 ./[navbar]-[sidebar].html。

## Product Vision
A unified administrative and data visualization dashboard that provides a clean, two-level navigation interface for interacting with backend RESTful APIs and exploring historical weather data in JSON format.

## Target Users
- **System Administrators:** Who need to view and modify backend data using the Swagger-defined API.
- **Data Consumers:** Who need to access, visualize, and download specific monthly weather data sets.

## Core Features
### 1. Two-Level Navigation Interface
- **Top Navbar:** Switches between primary modules (e.g., BackEnd, DataJson).
- **Sidebar:** Dynamically updates based on the selected Navbar item.
- **Content Area:** Uses an `iframe` to load specialized pages following the naming convention `[navbar]-[sidebar].html`.

### 2. BackEnd Module (API Management)
- **Swagger Integration:** Operations are derived from `swagger.json` and mapped to individual sidebar items.
- **Unified Auth Header:** Each page includes account and password inputs at the top for API login and session management.
- **RESTful CRUD Operations:** Specialized pages for GET, POST, PUT, and DELETE operations with parameter input fields.

### 3. DataJson Module (Data Explorer)
- **Time-based Retrieval:** Input fields for [Year] and [Month] to fetch data from the ngrok-hosted API.
- **Interactive List:** Data items are displayed in a collapsible list format, showing the date by default and expanding to reveal full JSON details.
- **Export Functionality:** Direct button to download the retrieved JSON data for local use.

## Design Goals
- **Modularity:** Each operation or data view is isolated in its own HTML file.
- **Simplicity:** A straightforward UI that focuses on data accessibility and API interaction.
- **Automation:** Leveraging the Swagger definition to define the administrative surface.