from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.http import require_POST
from .serializers import FacultySerializer, SpecialtiesSerializer
from django.views.decorators.csrf import csrf_exempt
from .models import Faculty, Specialties
import logging

logger = logging.getLogger(__name__)


@api_view(['GET'])
def getTest(requesst):
    faculties = Faculty.objects.all()
    specialties = Specialties.objects.all()

    faculty_serializer = FacultySerializer(faculties, many=True)
    specialty_serializer = SpecialtiesSerializer(specialties, many=True)

    return Response({
        'faculties': faculty_serializer.data,
        'specialties': specialty_serializer.data
    })


@csrf_exempt
@api_view(['POST'])
def submit_form(request):
    data = request.POST
    study_types = data.getlist('studyType', [])
    interests = data.getlist('interests', [])
    study_types = study_types[0].split(',')
    interests = interests[0].split(',')
    print(data)
    print(study_types)
    print(interests)

    faculties = Faculty.objects.all()
    faculty_serializer = FacultySerializer(faculties, many=True)

    specialties = Specialties.objects.all()
    specialty_serializer = SpecialtiesSerializer(specialties, many=True)

    filtered_specialties = []

    # Фильтрация для каждого типа обучения
    if 'Очно' in study_types:
        filtered_specialties.extend(Specialties.objects.filter(
            studying_forms__in=['дневная', 'дневная сокращенная']
        ))

    if 'Заочно' in study_types:
        filtered_specialties.extend(Specialties.objects.filter(
            studying_forms__in=['заочная', 'заочная сокращенная']
        ))

    # Сериализация всех отфильтрованных специальностей
    specialty_serializer = SpecialtiesSerializer(
        filtered_specialties, many=True
    )

    filtered_faculties = []

    for interest in interests:
        if interest == 'Управление и экономика':
            filtered_faculties.extend(Faculty.objects.filter(
                interests__in=['Управление и экономика']
            ))
        if interest == 'Гуманитарные и социальные науки':
            filtered_faculties.extend(Faculty.objects.filter(
                interests__in=['Гуманитарные и социальные науки']
            ))
        if interest == 'Техника и технологии':
            filtered_faculties.extend(Faculty.objects.filter(
                interests__in=['Техника и технологии']
            ))
        if interest == 'Информационные технологии':
            filtered_faculties.extend(Faculty.objects.filter(
                interests__in=['Информационные технологии']
            ))
        if interest == 'Медиа, дизайн и архитектура':
            filtered_faculties.extend(Faculty.objects.filter(
                interests__in=['Медиа, дизайн и архитектура']
            ))
        if interest == 'Исскуство и творчетсво':
            filtered_faculties.extend(Faculty.objects.filter(
                interests__in=['Исскуство и творчетсво']
            ))
        if interest == 'Точные и естественные науки':
            filtered_faculties.extend(Faculty.objects.filter(
                interests__in=['Точные и естественные науки']
            ))
        if interest == 'Безопасность и военное дело':
            filtered_faculties.extend(Faculty.objects.filter(
                interests__in=['Безопасность и военное дело']
            ))
        if interest == 'Медицина и здравоохранение':
            filtered_faculties.extend(Faculty.objects.filter(
                interests__in=['Медицина и здравоохранение']
            ))
        if interest == 'Сфера услуг':
            filtered_faculties.extend(Faculty.objects.filter(
                interests__in=['Сфера услуг']
            ))

    faculty_serializer = FacultySerializer(
        filtered_faculties, many=True
    )

    return Response({
        'faculties': faculty_serializer.data,
        'specialties': specialty_serializer.data
    })
