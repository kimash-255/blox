# arifahub.py
from django.db import models
from core.models import BaseModel

class Meeting(BaseModel):
    numberfield_1 = models.IntegerField(verbose_name='NumberField 1', null=True, blank=True)
    decimalfield_1 = models.DecimalField(verbose_name='DecimalField 1', null=True, blank=True, max_digits=10, decimal_places=2)
    booleanfield_1 = models.BooleanField(verbose_name='BooleanField 1', null=True, blank=True)
    datefield_1 = models.DateField(verbose_name='DateField 1', null=True, blank=True)
    decimalfield_2 = models.DecimalField(verbose_name='DecimalField 2', null=True, blank=True, max_digits=10, decimal_places=2)
    datetimefield_1 = models.DateTimeField(verbose_name='DateTimeField 1', null=True, blank=True)
    slugfield_1 = models.SlugField(verbose_name='SlugField 1', null=True, blank=True, max_length=50)


class David(BaseModel):
    charfield_1 = models.CharField(verbose_name='CharField 1', null=True, blank=True, max_length=255)
    numberfield_1 = models.IntegerField(verbose_name='NumberField 1', null=True, blank=True)
    decimalfield_1 = models.DecimalField(verbose_name='DecimalField 1', null=True, blank=True, max_digits=10, decimal_places=2)


