from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator


class Student(models.Model):
    DEPARTMENT_CHOICES = [
        ('AI & Data Science', 'AI & Data Science'),
        ('Computer Science Engineering', 'Computer Science Engineering'),
        ('Information Technology', 'Information Technology'),
        ('Electronics & Communication Engineering', 'Electronics & Communication Engineering'),
        ('Electrical & Electronics Engineering', 'Electrical & Electronics Engineering'),
        ('Mechanical Engineering', 'Mechanical Engineering'),
        ('Civil Engineering', 'Civil Engineering'),
    ]

    YEAR_CHOICES = [
        (1, '1st Year'),
        (2, '2nd Year'),
        (3, '3rd Year'),
        (4, '4th Year'),
    ]

    phone_regex = RegexValidator(
        regex=r'^\+?[0-9\s\-()]{7,15}$',
        message="Please enter a valid phone number (7 to 15 digits)."
    )

    student_id = models.IntegerField(
        primary_key=True,
        help_text="Unique numeric identifier for the student"
    )
    name = models.CharField(
        max_length=100,
        help_text="Full Name of the student"
    )
    email = models.EmailField(
        unique=True,
        help_text="Unique email address"
    )
    department = models.CharField(
        max_length=100,
        choices=DEPARTMENT_CHOICES,
        help_text="Academic department"
    )
    year = models.IntegerField(
        choices=YEAR_CHOICES,
        validators=[MinValueValidator(1), MaxValueValidator(4)],
        help_text="Academic year (1, 2, 3, or 4)"
    )
    phone = models.CharField(
        validators=[phone_regex],
        max_length=20,
        help_text="Contact phone number"
    )

    class Meta:
        ordering = ['student_id']

    def __str__(self):
        return f"{self.student_id} - {self.name}"
