# Spec: Authentication Fixes and Improvements

## Overview
Address connectivity and feedback issues in the authentication system. This involves updating the API domain, enhancing error reporting, and adding a manual retry mechanism.

## Functional Requirements

### 1. API Domain Update
- Update the base URL for all API requests in `js/api-client.js` to `https://meteo.local2.tempestdigi.com`.
- Ensure `axios` is configured globally to use this domain.
- Verify that `withCredentials: true` is correctly set if the domain relies on session cookies.

### 2. Enhanced Error Reporting
- Modify `checkAuthStatus` and the global `apiRequest` handling to capture detailed error information.
- Display the HTTP status code (e.g., 401, 403, 500) and the associated status text in the UI.
- If the server provides a JSON response body containing an error message, display that message to the user.

### 3. Retry Mechanism
- Add a "Retry" button to the authentication status section (the `#auth-status` area).
- When clicked, this button should immediately invoke `checkAuthStatus()` using the current values in the account and password input fields.
- The button should only be visible when the authentication status is in an error or unauthorized state.

### 4. Verification
- Confirm that `curl` successfully interacts with the new domain using the provided credentials (`yolko` / `yolko123`).

## Acceptance Criteria
- [ ] API requests target `https://meteo.local2.tempestdigi.com`.
- [ ] Failed login attempts show specific status codes (e.g., "Error 401: Unauthorized").
- [ ] Detailed server error messages (if present in the response body) are visible in the UI.
- [ ] A "Retry" button appears on failure and successfully re-triggers the auth check.
- [ ] The dashboard loads data correctly after a successful retry or domain update.
