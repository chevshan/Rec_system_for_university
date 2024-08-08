from .models import Faculty, Specialties
from rest_framework import viewsets, permissions
from .serializers import FacultySerializer, SpecialtiesSerializer


class FacultyViewSet(viewsets.ModelViewSet):
    queryset = Faculty.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = FacultySerializer


class SpecialtiesViewSet(viewsets.ModelViewSet):
    queryset = Specialties.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = SpecialtiesSerializer
