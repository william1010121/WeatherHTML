# Plan: Authentication Fixes and Improvements

## Phase 1: Base Configuration & Connectivity
- [x] Task: Create `proxy_server.py` to bypass CORS issues.
- [x] Task: Create `run.py` to launch both frontend and backend servers.
- [x] Task: Execute `python3 run.py` and verify full system connectivity.
- [x] Task: Update `axios.defaults.baseURL` in `js/api-client.js` to `http://localhost:8000`.
- [x] Task: Ensure `axios.defaults.withCredentials = true` is explicitly set.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Configuration' (Protocol in workflow.md)

## Phase 2: Enhanced Logic & Error Handling
- [x] Task: Refactor `checkAuthStatus` to capture and store detailed error objects (status, statusText, data). (03633a1)
- [x] Task: Implement retry logic by exposing `checkAuthStatus` to the global `window` object if necessary. (03633a1)
- [x] Task: Conductor - User Manual Verification 'Phase 2: Logic' (Protocol in workflow.md) (03633a1)

## Phase 3: UI Updates (All Pages)
- [x] Task: Update the `#auth-status` container in `BackEnd-Template.html` and resource pages to support detailed error display and a retry button. (03633a1)
- [x] Task: Update `js/api-client.js` to dynamically render the error message and "Retry" button upon failure. (03633a1)
- [x] Task: Conductor - User Manual Verification 'Phase 3: UI Implementation' (Protocol in workflow.md) (03633a1)

## Phase 4: Final Verification
- [ ] Task: Execute `/usr/bin/python3 run.py` to bypass broken pyenv SSL.
- [ ] Task: Test the full flow: Invalid credentials -> Error display -> Correct credentials -> Retry -> Success.
- [ ] Task: Verify data loading across `BackEnd-User.html` and environmental pages after successful auth.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final Verification' (Protocol in workflow.md)