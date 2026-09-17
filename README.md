# Student Management System

A full-stack CRUD web application for managing student records built with Python Django REST Framework, SQLite, and React.

---

## 📌 Features

- **Full-Stack CRUD**:
  - **Create**: Add new student with live field validations.
  - **Read All**: View all student records in a responsive, styled table.
  - **Read One**: View complete student profile details.
  - **Update**: Edit existing student details (Student ID remains locked as primary key).
  - **Delete**: Remove student with explicit confirmation modal dialog.
- **Zero Sample Data Guarantee**: The SQLite database starts completely empty (0 records) after migrations. Displays `"No students found."` until user manually creates records.
- **Real-Time Search**: Search students by Student ID, Name, or Email dynamically.
- **Multi-Criteria Filtering**: Filter students by Department and Academic Year simultaneously.
- **Client & Server Validation**:
  - Unique Student ID verification.
  - Unique & valid Email address validation.
  - Non-numeric name validation.
  - Allowed Year selection (1st Year, 2nd Year, 3rd Year, 4th Year).
  - Phone number format validation.
- **User Experience**:
  - Modern glassmorphic responsive UI.
  - Toast notifications for success/error feedback.
  - Loading states (`"Loading students..."`, `"Saving..."`, `"Deleting..."`).
  - Mobile, tablet, and desktop responsive layout.

---

## 🛠️ Technology Stack

- **Frontend**: React (Vite), JavaScript, HTML5, Vanilla CSS3 (Custom Glassmorphism Design System)
- **Backend**: Python 3.10+, Django 5.x, Django REST Framework (DRF), `django-cors-headers`
- **Database**: SQLite3
- **API Testing**: Postman (Collection included in `docs/Postman_Collection.json`)
- **Version Control**: Git / GitHub ready

---

## 📁 Project Structure

```text
Student Management/
├── backend/
│   ├── core/                  # Django project settings & URLs
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── students/              # Django app for Student model & APIs
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   └── tests.py
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/        # Navbar, Toast, DeleteModal
│   │   ├── pages/             # Dashboard, StudentList, AddStudent, EditStudent, ViewStudent
│   │   ├── services/          # API fetch service client & options
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css          # Design system & responsive styles
│   ├── package.json
│   └── vite.config.js
│
├── docs/                      # 12 SOP project documentation files & Postman collection
│   ├── 01_project_overview.md
│   ├── 02_problem_statement.md
│   ├── 03_objectives.md
│   ├── 04_technology_stack.md
│   ├── 05_system_architecture.md
│   ├── 06_database_design.md
│   ├── 07_api_documentation.md
│   ├── 08_crud_implementation.md
│   ├── 09_validation.md
│   ├── 10_testing.md
│   ├── 11_challenges_and_solutions.md
│   ├── 12_future_enhancements.md
│   └── Postman_Collection.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Setup & Execution Guide

### 1. Backend Setup (Django REST Framework)

Open a terminal inside the project directory:

```powershell
cd backend
```

Create and activate a virtual environment:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

Install backend dependencies:

```powershell
pip install -r requirements.txt
```

Run database migrations (Creates database schema with ZERO initial records):

```powershell
python manage.py makemigrations
python manage.py migrate
```

(Optional) Run unit tests to verify database state and validation rules:

```powershell
python manage.py test students
```

Start the Django REST API development server:

```powershell
python manage.py runserver
```

The Django backend API will run at: **`http://127.0.0.1:8000`**

---

### 2. Frontend Setup (React)

Open a second terminal window in the project directory:

```powershell
cd frontend
npm install
npm run dev
```

The React frontend development server will launch at: **`http://localhost:5173`** (or `http://localhost:3000` / `http://localhost:5000`).

---

## 🎓 Demonstration Walkthrough Flow (For Faculty Review)

1. **Initial Empty State**:
   - Open `http://localhost:5173` in your browser.
   - Verify Total Students reads `0` and table displays `"No students found."`. This proves there is no pre-populated sample data.
2. **Add Student**:
   - Click **Add Student**.
   - Enter details:
     - Student ID: `101`
     - Name: `Jane Doe`
     - Email: `jane.doe@example.com`
     - Department: `Computer Science Engineering`
     - Year: `3rd Year`
     - Phone: `9876543210`
   - Click **Add Student** button. Observe toast notification: `"Student added successfully."`.
3. **View & Edit Student**:
   - Locate Student `101` in the table.
   - Click **View** to inspect full details from the database.
   - Click **Edit**. Change Name to `Jane Updated` and Year to `4th Year`. Click **Save Changes**.
   - Observe updated record in the table.
4. **Search & Filter**:
   - Type `Jane` into the search box to dynamically filter records.
   - Select `Computer Science Engineering` from Department filter and `4th Year` from Year filter.
5. **Delete Confirmation**:
   - Click **Delete**. Confirm modal prompt: `"Are you sure you want to delete this student?"`.
   - Observe success toast `"Student deleted successfully."` and return to `"No students found."`.
6. **API Verification**:
   - Import `docs/Postman_Collection.json` into Postman to test GET, POST, PUT, DELETE endpoints.

---

## 📄 License & Compliance

This project is fully compliant with the College Mini-Project Web Application SOP guidelines for full-stack student management systems.
