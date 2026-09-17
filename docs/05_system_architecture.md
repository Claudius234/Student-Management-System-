# 05. System Architecture

The Student Management System follows a decoupled client-server architecture.

### Architecture Diagram

```text
User
 ↓
React Frontend (http://localhost:5173)
 ↓
REST API (HTTP / JSON)
 ↓
Django REST Framework (http://127.0.0.1:8000/api/students/)
 ↓
Django ORM (Models & Serializers)
 ↓
SQLite Database (db.sqlite3)
```

### Component Flow
1. **User Interaction**: User interacts with the React UI (Dashboard, Student List, Form, Detail View).
2. **HTTP Requests**: React components make asynchronous `fetch` calls to Django API endpoints.
3. **Serializer & Validation**: Django REST Framework validates incoming data against model constraints.
4. **ORM Execution**: Django ORM translates validated calls into standard SQL operations.
5. **Database Storage**: SQLite persists student records across server restarts.
6. **JSON Response**: DRF serializes model instances into JSON responses with HTTP status codes.
