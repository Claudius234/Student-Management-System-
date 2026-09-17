# 06. Database Design

The database schema consists of a single dedicated `Student` model designed in accordance with Django ORM standards.

### Student Entity Schema

```text
Student
--------------------------------
student_id  : Integer (Primary Key, Unique, Required)
name        : String (max_length=100, Required)
email       : String (EmailField, Unique, Required)
department  : String (max_length=100, Required)
year        : Integer (Choices: 1, 2, 3, 4, Required)
phone       : String (max_length=20, Validated Regex, Required)
```

### Constraints & Rules
- **Primary Key**: `student_id` is an explicit user-provided integer primary key.
- **Uniqueness**: `student_id` and `email` enforce strict database-level unique constraints.
- **Allowed Departments**:
  - AI & Data Science
  - Computer Science Engineering
  - Information Technology
  - Electronics & Communication Engineering
  - Electrical & Electronics Engineering
  - Mechanical Engineering
  - Civil Engineering
- **Allowed Years**:
  - 1 (Displayed in UI as 1st Year)
  - 2 (Displayed in UI as 2nd Year)
  - 3 (Displayed in UI as 3rd Year)
  - 4 (Displayed in UI as 4th Year)
- **Zero Default Seed Data**: Migrations create the schema without inserting any rows. Initial row count is strictly `0`.
