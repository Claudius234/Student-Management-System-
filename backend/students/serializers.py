import re
from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['student_id', 'name', 'email', 'department', 'year', 'phone']
        extra_kwargs = {
            'student_id': {
                'required': True,
                'error_messages': {
                    'required': 'Student ID is required.',
                    'invalid': 'Student ID must be a valid number.',
                    'unique': 'Student ID already exists.',
                    'null': 'Student ID is required.',
                }
            },
            'name': {
                'required': True,
                'error_messages': {
                    'required': 'Name is required.',
                    'blank': 'Name is required.',
                }
            },
            'email': {
                'required': True,
                'error_messages': {
                    'required': 'Please enter a valid email address.',
                    'invalid': 'Please enter a valid email address.',
                    'blank': 'Please enter a valid email address.',
                    'unique': 'Email already exists.',
                }
            },
            'department': {
                'required': True,
                'error_messages': {
                    'required': 'Department is required.',
                    'blank': 'Department is required.',
                    'invalid_choice': 'Invalid department selected.',
                }
            },
            'year': {
                'required': True,
                'error_messages': {
                    'required': 'Year is required.',
                    'invalid': 'Year must be 1, 2, 3, or 4.',
                    'invalid_choice': 'Year must be 1, 2, 3, or 4.',
                }
            },
            'phone': {
                'required': True,
                'error_messages': {
                    'required': 'Phone number is required.',
                    'blank': 'Phone number is required.',
                }
            }
        }

    def validate_name(self, value):
        name = value.strip() if isinstance(value, str) else str(value)
        if not name:
            raise serializers.ValidationError("Name is required.")
        if name.isdigit():
            raise serializers.ValidationError("Name cannot contain numeric-only values.")
        return name

    def validate_year(self, value):
        try:
            val_int = int(value)
        except (ValueError, TypeError):
            raise serializers.ValidationError("Year must be 1, 2, 3, or 4.")
            
        if val_int not in [1, 2, 3, 4]:
            raise serializers.ValidationError("Year must be 1, 2, 3, or 4.")
        return val_int

    def validate_phone(self, value):
        phone = value.strip() if isinstance(value, str) else str(value)
        if not phone:
            raise serializers.ValidationError("Phone number is required.")
        digits_only = re.sub(r'\D', '', phone)
        if len(digits_only) < 7 or len(digits_only) > 15:
            raise serializers.ValidationError("Please enter a valid phone number (7 to 15 digits).")
        return phone
