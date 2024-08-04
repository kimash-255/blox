from django.db import models
from core.models import BaseModel
import uuid


class Danci(BaseModel):
    datefield = models.DateField(verbose_name='DateField 1', null=True, blank=True)
    charfield_1 = models.CharField(verbose_name='CharField 1', null=True, blank=True, max_length=255)
    decimalfield_1 = models.DecimalField(verbose_name='DecimalField 1', null=True, blank=True, max_digits=10, decimal_places=2)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
