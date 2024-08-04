# logistics.py
from django.db import models
from core.models import BaseModel


class Item(BaseModel):
    name = models.CharField(verbose_name="", null=True, blank=True, max_length=255)

    CHOICES_TYPE = [
        ("Air", "Air"),
        ("Sea", "Sea"),
    ]

    type = models.CharField(
        verbose_name="",
        null=True,
        blank=True,
        default="Air",
        max_length=255,
        choices=CHOICES_TYPE,
    )
    amount = models.IntegerField(verbose_name="", null=True, blank=True)
