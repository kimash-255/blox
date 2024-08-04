# my_app.py
from django.db import models
from core.models import BaseModel

class Try(BaseModel):
    charfield_1 = models.CharField(verbose_name='CharField 1', null=True, blank=True, max_length=255)
    textfield_1 = models.TextField(verbose_name='TextField 1', null=True, blank=True)
class Turn(BaseModel):
    floatfield_1 = models.FloatField(verbose_name='FloatField 1', null=True, blank=True)
    foreignkey_1 = models.ForeignKey('Try', verbose_name='ForeignKey 1', null=True, blank=True, on_delete=models.CASCADE)
