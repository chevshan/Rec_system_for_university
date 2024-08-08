from django.urls import path
from rest_framework import routers
from .api import FacultyViewSet, SpecialtiesViewSet
from . import views

router = routers.DefaultRouter()
router.register('api/backapp/faculty', FacultyViewSet, 'backapp_faculty')
router.register('api/backapp/specialties',
                SpecialtiesViewSet, 'backapp_specialties')

urlpatterns = router.urls
