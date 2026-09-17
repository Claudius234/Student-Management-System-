from django.db.models import Q
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer


class StudentViewSet(viewsets.ModelViewSet):
    """
    API endpoint for full CRUD operations on Student records.
    Provides standard REST responses with friendly JSON messages.
    """
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def get_queryset(self):
        queryset = Student.objects.all()
        
        # Search functionality: search across student_id, name, email
        search = self.request.query_params.get('search', None)
        if search:
            search = search.strip()
            # If search term is digits, also check student_id exact/icontains
            id_filter = Q(student_id__icontains=search) if search.isdigit() else Q()
            queryset = queryset.filter(
                id_filter | Q(name__icontains=search) | Q(email__icontains=search)
            )

        # Department filter
        department = self.request.query_params.get('department', None)
        if department and department != 'All Departments':
            queryset = queryset.filter(department=department)

        # Year filter
        year = self.request.query_params.get('year', None)
        if year and year != 'All Years':
            try:
                year_int = int(year)
                queryset = queryset.filter(year=year_int)
            except ValueError:
                pass

        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        student = serializer.save()
        return Response(
            {
                "message": "Student added successfully.",
                "data": StudentSerializer(student).data
            },
            status=status.HTTP_201_CREATED
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        student = serializer.save()
        return Response(
            {
                "message": "Student updated successfully.",
                "data": StudentSerializer(student).data
            },
            status=status.HTTP_200_OK
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": "Student deleted successfully."},
            status=status.HTTP_200_OK
        )
