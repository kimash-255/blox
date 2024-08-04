# logistics.py
from django.db import models
from core.models import BaseModel


class Item(BaseModel):
    name = models.CharField(verbose_name='Name', null=False, blank=False, default="Name", max_length=255)
    CHOICES_TYPE = [
        ('Air', 'Air'),
        ('Sea', 'Sea'),
        ('Road', 'Road'),
    ]
    type = models.CharField(verbose_name='Type', null=True, blank=True, default="Air", max_length=255, choices=CHOICES_TYPE)
    amount = models.IntegerField(verbose_name='Amount', null=True, blank=True)
