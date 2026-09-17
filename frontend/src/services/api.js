const API_BASE_URL = 'http://127.0.0.1:8000/api/students';

/**
 * Helper function for handling HTTP requests with error parsing.
 */
async function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  let data = null;
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  }

  if (!response.ok) {
    if (data) {
      // Return structured validation errors or error message
      const error = new Error(data.message || 'An error occurred during the request.');
      error.details = data;
      error.status = response.status;
      throw error;
    }
    throw new Error(`Server returned status ${response.status}: ${response.statusText}`);
  }

  return data;
}

/**
 * Fetch all students with optional search and filter parameters.
 */
export async function getStudents(search = '', department = '', year = '') {
  const params = new URLSearchParams();
  if (search.trim()) params.append('search', search.trim());
  if (department && department !== 'All Departments') params.append('department', department);
  if (year && year !== 'All Years') params.append('year', year);

  const url = `${API_BASE_URL}/${params.toString() ? '?' + params.toString() : ''}`;
  try {
    const response = await fetch(url);
    return await handleResponse(response);
  } catch (err) {
    if (err.message && err.message.includes('Failed to fetch')) {
      throw new Error('Unable to connect to the server. Please make sure the Django backend is running.');
    }
    throw err;
  }
}

/**
 * Fetch a single student by ID.
 */
export async function getStudentById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}/`);
    return await handleResponse(response);
  } catch (err) {
    if (err.message && err.message.includes('Failed to fetch')) {
      throw new Error('Unable to connect to the server. Please make sure the Django backend is running.');
    }
    throw err;
  }
}

/**
 * Create a new student record.
 */
export async function createStudent(studentData) {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    });
    return await handleResponse(response);
  } catch (err) {
    if (err.message && err.message.includes('Failed to fetch')) {
      throw new Error('Unable to connect to the server. Please make sure the Django backend is running.');
    }
    throw err;
  }
}

/**
 * Update an existing student record.
 */
export async function updateStudent(id, studentData) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    });
    return await handleResponse(response);
  } catch (err) {
    if (err.message && err.message.includes('Failed to fetch')) {
      throw new Error('Unable to connect to the server. Please make sure the Django backend is running.');
    }
    throw err;
  }
}

/**
 * Delete a student record.
 */
export async function deleteStudent(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}/`, {
      method: 'DELETE',
    });
    return await handleResponse(response);
  } catch (err) {
    if (err.message && err.message.includes('Failed to fetch')) {
      throw new Error('Unable to connect to the server. Please make sure the Django backend is running.');
    }
    throw err;
  }
}

export const DEPARTMENT_OPTIONS = [
  'AI & Data Science',
  'Computer Science Engineering',
  'Information Technology',
  'Electronics & Communication Engineering',
  'Electrical & Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
];

export const YEAR_OPTIONS = [
  { value: 1, label: '1st Year' },
  { value: 2, label: '2nd Year' },
  { value: 3, label: '3rd Year' },
  { value: 4, label: '4th Year' },
];
