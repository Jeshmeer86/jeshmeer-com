# MVP End-to-End Manual Browser Test Plan

## Assumptions

- Demo user credentials are seeded and available (e.g., demo@example.com / password123)
- At least one organization and user exist in the system
- No deals exist initially unless otherwise seeded
- The application is running in a test or staging environment

---

## Test Flow: Deal Management MVP

### 1. Sign In

- **Step:** Navigate to the sign-in page. Enter demo user credentials and submit.
- **Expected Result:** User is authenticated and redirected to the dashboard or deals list page.

### 2. Open Deals List

- **Step:** From the main navigation, select "Deals" or equivalent to view the deals list.
- **Expected Result:** The deals list page loads, showing existing deals (empty if none seeded).

### 3. Create Deal

- **Step:** Click the "New Deal" or "Create Deal" button. Fill in required fields (e.g., title, value) and submit.
- **Expected Result:** A new deal appears in the deals list with the entered details.

### 4. Open Deal Detail

- **Step:** Click on the newly created deal in the list.
- **Expected Result:** The deal detail page loads, displaying all deal information and available actions.

### 5. Change Status to RESERVED

- **Step:** Locate the status control. Change the deal status to "RESERVED" and confirm if prompted.
- **Expected Result:** The deal status updates to "RESERVED" and is reflected in the UI.

### 6. Add Note

- **Step:** Find the notes/comments section. Add a new note and submit.
- **Expected Result:** The note appears in the notes section, timestamped and attributed to the user.

### 7. Upload Document

- **Step:** Locate the document upload area. Select a file (e.g., PDF or DOCX) and upload.
- **Expected Result:** The document is listed as attached to the deal, with filename and upload time.

### 8. View Timeline Update

- **Step:** Open the timeline or activity log for the deal.
- **Expected Result:** Timeline shows recent actions: status change, note addition, and document upload, each with correct details.

### 9. Export JSON

- **Step:** Click the "Export JSON" button or link.
- **Expected Result:** A JSON file downloads containing the deal's data.

### 10. Export HTML

- **Step:** Click the "Export HTML" button or link.
- **Expected Result:** An HTML file downloads or opens, showing a formatted view of the deal's data.

---

## Notes

- Repeat steps for multiple deals if needed.
- Validate error handling for invalid inputs where relevant.
- Confirm all actions are reflected in the UI and persisted after page reload.
