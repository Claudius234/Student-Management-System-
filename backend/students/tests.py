from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Student


class StudentAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_database_starts_empty(self):
        """Verify database contains zero student records on startup."""
        self.assertEqual(Student.objects.count(), 0)
        response = self.client.get('/api/students/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_create_student_success(self):
        """Verify manual student creation through API."""
        payload = {
            "student_id": 101,
            "name": "Jane Doe",
            "email": "jane.doe@example.com",
            "department": "Computer Science Engineering",
            "year": 3,
            "phone": "9876543210"
        }
        response = self.client.post('/api/students/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["message"], "Student added successfully.")
        self.assertEqual(Student.objects.count(), 1)

    def test_duplicate_student_id_validation(self):
        """Verify duplicate Student ID is rejected."""
        Student.objects.create(
            student_id=101,
            name="Jane Doe",
            email="jane@example.com",
            department="Computer Science Engineering",
            year=3,
            phone="9876543210"
        )
        payload = {
            "student_id": 101,
            "name": "John Smith",
            "email": "john@example.com",
            "department": "Information Technology",
            "year": 1,
            "phone": "9123456789"
        }
        response = self.client.post('/api/students/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("student_id", response.data)

    def test_duplicate_email_validation(self):
        """Verify duplicate email is rejected."""
        Student.objects.create(
            student_id=101,
            name="Jane Doe",
            email="jane@example.com",
            department="Computer Science Engineering",
            year=3,
            phone="9876543210"
        )
        payload = {
            "student_id": 102,
            "name": "John Smith",
            "email": "jane@example.com",
            "department": "Information Technology",
            "year": 1,
            "phone": "9123456789"
        }
        response = self.client.post('/api/students/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)

    def test_update_student(self):
        """Verify updating a student via PUT."""
        student = Student.objects.create(
            student_id=101,
            name="Jane Doe",
            email="jane@example.com",
            department="Computer Science Engineering",
            year=3,
            phone="9876543210"
        )
        update_payload = {
            "student_id": 101,
            "name": "Jane Updated",
            "email": "jane.updated@example.com",
            "department": "AI & Data Science",
            "year": 4,
            "phone": "9876543210"
        }
        response = self.client.put('/api/students/101/', update_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        student.refresh_from_db()
        self.assertEqual(student.name, "Jane Updated")

    def test_delete_student(self):
        """Verify deleting a student via DELETE."""
        Student.objects.create(
            student_id=101,
            name="Jane Doe",
            email="jane@example.com",
            department="Computer Science Engineering",
            year=3,
            phone="9876543210"
        )
        response = self.client.delete('/api/students/101/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Student.objects.count(), 0)
