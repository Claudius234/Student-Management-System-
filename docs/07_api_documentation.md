# 07. REST API Documentation

Base URL: `http://127.0.0.1:8000/api/students/`

---

### 1. List / Search Students
- **Endpoint**: `GET /api/students/`
- **Query Parameters**:
  - `search`: Filter by Student ID, Name, or Email
  - `department`: Filter by specific department name
  - `year`: Filter by academic year (1, 2, 3, 4)
- **Response**: `200 OK`
```json
[
  {
    "student_id": 101,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "department": "Computer Science Engineering",
    "year": 3,
    "phone": "9876543210"
  }
]
```

---

### 2. Create Student
- **Endpoint**: `POST /api/students/`
- **Request Body**:
```json
{
  "student_id": 101,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "department": "Computer Science Engineering",
  "year": 3,
  "phone": "9876543210"
}
```
- **Response**: `201 Created`
```json
{
  "message": "Student added successfully.",
  "data": {
    "student_id": 101,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "department": "Computer Science Engineering",
    "year": 3,
    "phone": "9876543210"
  }
}
```

---

### 3. Retrieve Single Student
- **Endpoint**: `GET /api/students/{student_id}/`
- **Response**: `200 OK` or `404 Not Found`

---

### 4. Update Student
- **Endpoint**: `PUT /api/students/{student_id}/` or `PATCH /api/students/{student_id}/`
- **Response**: `200 OK`
```json
{
  "message": "Student updated successfully.",
  "data": { ... }
}
```

---

### 5. Delete Student
- **Endpoint**: `DELETE /api/students/{student_id}/`
- **Response**: `200 OK`
```json
{
  "message": "Student deleted successfully."
}
```
