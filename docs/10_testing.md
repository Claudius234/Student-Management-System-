# 10. Testing Guide & Verification

### Automated Unit Testing (Backend)
Run Django test suite:
```powershell
cd backend
.\venv\Scripts\python.exe manage.py test students
```
**Test Cases Verified**:
1. `test_database_starts_empty`: Confirms 0 records after migration.
2. `test_create_student_success`: Tests POST endpoint creation.
3. `test_duplicate_student_id_validation`: Tests rejection of existing Student ID.
4. `test_duplicate_email_validation`: Tests rejection of existing Email address.
5. `test_update_student`: Tests PUT update endpoint.
6. `test_delete_student`: Tests DELETE endpoint removal.

### Postman API Testing
Import `docs/Postman_Collection.json` into Postman to test:
- `POST /api/students/`
- `GET /api/students/`
- `GET /api/students/101/`
- `PUT /api/students/101/`
- `DELETE /api/students/101/`

### Manual SOP Demonstration Verification
1. **Initial Load**: Launch app -> Total Students: 0 -> "No students found."
2. **Add Record**: Click "Add Student" -> Enter 101, Jane Doe -> Submit -> Toast notification shown.
3. **View & Edit**: View details -> Edit name to Jane Updated -> List reflects change.
4. **Search & Filter**: Type "Jane" in search box -> Select "Computer Science Engineering" filter.
5. **Delete Record**: Click "Delete" -> Confirm modal -> List returns to "No students found."
