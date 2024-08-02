# meeting.py
from django.db import models
from core.models import BaseModel








class David(BaseModel):
    floatfie = models.CharField(verbose_name='FloatField 1', null=True, blank=True, max_length=15)
    daten = models.EmailField(verbose_name='DateField 1', null=True, blank=True, max_length=254)
    decimalfiel = models.CharField(verbose_name='DecimalFiel', null=True, blank=True, max_length=255)


