from django.db import models


class Faculty(models.Model):
    theads = models.CharField(max_length=200)
    interests = models.CharField(max_length=200, default='')

    def __str__(self):
        return self.theads


class Specialties(models.Model):
    specialties = models.CharField(max_length=200)
    studying_forms = models.CharField(max_length=200)
    places = models.CharField(max_length=200)
    marks = models.CharField(max_length=200)
    budget_marks = models.CharField(max_length=200, default='')
    payment_marks = models.CharField(max_length=200, default='')
    prices = models.CharField(max_length=200)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)

    def __str__(self):
        return self.specialties
