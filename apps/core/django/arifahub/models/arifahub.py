# arifahub.py
from django.db import models
from core.models import BaseModel

class Nextt(BaseModel):
    datefield_1 = models.DateField(verbose_name='DateField 1', null=True, blank=True)
class David(BaseModel):
    pass

