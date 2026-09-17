# 08. CRUD Implementation Details

### 1. Create (POST)
- Triggered from **Add Student** page in React.
- Transmits form data to `POST /api/students/`.
- Validates field data in DRF serializer.
- On success: Returns `201 Created`, displays toast notification `"Student added successfully."`, and redirects to Student List.

### 2. Read (GET)
- **Read All**: Invoked on loading **Student List** and **Dashboard** pages.
- **Read One**: Invoked when clicking **View** action button for a specific student (`GET /api/students/{id}/`).
- Displays empty state (`"No students found."`) if database contains 0 rows.

### 3. Update (PUT / PATCH)
- Triggered from **Edit Student** page.
- Prefills existing student values from the database.
- Student ID field is locked/read-only to preserve primary key identity.
- On save: Transmits data to `PUT /api/students/{id}/`, returns `200 OK`, shows success toast, and updates the list.

### 4. Delete (DELETE)
- Triggered by clicking **Delete** button in Student List table or Detail page.
- Displays modal dialog prompt: `"Are you sure you want to delete this student?"`.
- On user confirmation: Sends `DELETE /api/students/{id}/`, returns `200 OK`, shows success toast `"Student deleted successfully."`, and reloads list.
