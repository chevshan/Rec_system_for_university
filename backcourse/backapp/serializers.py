from rest_framework import serializers
from .models import Faculty, Specialties


class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = '__all__'


class SpecialtiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialties
        fields = '__all__'
