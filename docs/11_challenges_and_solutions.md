# 11. Challenges and Solutions

### Challenge 1: Ensuring 0 Initial Seed Data
- **Problem**: Default Django tutorials often include seed fixtures or sample data that populate upon migration.
- **Solution**: Designed migrations strictly without data fixtures. Added automated unit tests to verify zero student records exist upon initial database creation.

### Challenge 2: Cross-Origin Resource Sharing (CORS) Issues
- **Problem**: Browser blocks React frontend (`http://localhost:5173`) requests to Django backend (`http://127.0.0.1:8000`).
- **Solution**: Configured `django-cors-headers` middleware in Django `settings.py` specifying exact allowed development origins.

### Challenge 3: Synchronizing Dynamic Search and Multi-Filter Controls
- **Problem**: Combining real-time text search with department and year dropdown filters caused state desynchronization.
- **Solution**: Implemented centralized query parameter building in `StudentViewSet` using Django Q objects and React `useCallback` hooks.

### Challenge 4: Preventing Double Form Submissions
- **Problem**: Rapid user clicks on submit buttons created duplicate request calls.
- **Solution**: Added local `submitting` / `isDeleting` state toggles that disable buttons and display loading spinners during active HTTP operations.
