from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = [
        ("EM", "Employee"),
        ("IT", "It_support"),
        ("MG", "Manager"),
    ]

    photo = models.ImageField(upload_to="users/%Y/%m/%d/", blank=True, null=True, verbose_name="Фотография")
    date_birth = models.DateTimeField(blank=True, null=True, verbose_name="Дата рождения")
    role = models.CharField(max_length=2, choices=ROLE_CHOICES)
