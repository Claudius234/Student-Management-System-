# 09. Validation Rules & Implementation

Validation is enforced on both **Frontend (Client-side)** and **Backend (Server-side)**.

### Field Validation Summary

| Field | Type | Validation Rules | Error Message |
| --- | --- | --- | --- |
| **Student ID** | Integer | Required, numeric, unique primary key | `Student ID is required.` / `Student ID already exists.` |
| **Name** | String | Required, non-empty, non-numeric only | `Name is required.` / `Name cannot contain numeric-only values.` |
| **Email** | String | Required, valid email format, unique | `Please enter a valid email address.` / `Email already exists.` |
| **Department** | Choice | Required, selected from allowed department list | `Department is required.` |
| **Year** | Choice | Required, integer `1, 2, 3, or 4` | `Year is required.` / `Year must be 1, 2, 3, or 4.` |
| **Phone** | String | Required, 7 to 15 numeric digits | `Please enter a valid phone number (7 to 15 digits).` |

### Error Feedback Flow
1. **Frontend**: Validates input on form submission before network call. Highlight fields with red error messages.
2. **Backend**: Django REST Framework `StudentSerializer` validates database-level constraints (uniqueness, field types).
3. **API Response**: Returns `400 Bad Request` with structured error messages displayed instantly in the UI.
