from django.db import models

from it_helpdesk.users.models import User


class Ticket(models.Model):
    PRIORITY_CHOICES = [
        ("LOW", "Low"),
        ("HIGH", "High"),
    ]

    TYPE_CHOICES = [
        ("SOFT", "Software"),
        ("HARD", "Hardware"),
        ("OTHER", "Other"),
    ]

    title = models.CharField(max_length=200, verbose_name="Имя задачи")
    description = models.CharField(max_length=200, verbose_name="Описание")
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author')
    assigned = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True, related_name='assigned')
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    closed_at = models.DateTimeField(blank=True, null=True)
    priority = models.CharField(max_length=4, choices=PRIORITY_CHOICES, default="LOW", verbose_name="Приоритет")
    type = models.CharField(max_length=5, choices=TYPE_CHOICES, verbose_name="Тип задачи")