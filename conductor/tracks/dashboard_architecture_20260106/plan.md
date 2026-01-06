# Plan: Dashboard Architecture

## Phase 1: Foundation & Navigation Shell
- [x] Task: Initialize project structure (CSS/JS folders) and install dependencies (Axios) (0e63c2c)
- [x] Task: Create `index.html` with Tailwind layout (Navbar + Sidebar + Iframe) (e7073a0)
- [x] Task: Implement basic navigation logic in `main.js` to switch sidebars (7654d81)
- [x] Task: Conductor - User Manual Verification 'Phase 1: Foundation' (2a9f87e)

## Phase 2: BackEnd Module & Swagger Parsing
- [x] Task: Create `BackEnd-Operations.md` by parsing `swagger.json` to list all operations (cee12a4)
- [ ] Task: Implement `swagger-parser.js` to dynamically build the BackEnd sidebar
- [ ] Task: Create a template for `BackEnd-[Operation].html` with Auth headers and parameter inputs
- [ ] Task: Conductor - User Manual Verification 'Phase 2: BackEnd Module' (Protocol in workflow.md)

## Phase 3: DataJson Module
- [ ] Task: Create `DataJson-Explorer.html` with Year/Month inputs
- [ ] Task: Implement fetching logic from the ngrok API and rendering collapsible list
- [ ] Task: Implement JSON download functionality
- [ ] Task: Conductor - User Manual Verification 'Phase 3: DataJson Module' (Protocol in workflow.md)

## Phase 4: Shared Auth & Integration
- [ ] Task: Implement `api-client.js` for shared Axios logic and `localStorage` auth
- [ ] Task: Integrate auth headers into the BackEnd operation pages
- [ ] Task: Final polish of navigation and layout
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Shared Auth' (Protocol in workflow.md)
