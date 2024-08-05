from django.db import models
from core.models import BaseModel
import uuid


class Danci(BaseModel):
    datefield = models.DateField(verbose_name='DateField 1', null=True, blank=True)
    charfield_1 = models.CharField(verbose_name='CharField 1', null=True, blank=True, max_length=255)
    decimalfield_1 = models.DecimalField(verbose_name='DecimalField 1', null=True, blank=True, max_digits=10, decimal_places=2)
    id = models.CharField(primary_key=True, max_length=255, default='#### {{charfield_1}}')
    def save(self, *args, **kwargs):
        if self.id == '#### {{charfield_1}}':
            self.id = self.generate_custom_id()
        super().save(*args, **kwargs)
    def generate_custom_id(self):
        from core.models.template import generate_custom_id
        return generate_custom_id('#### {{charfield_1}}', self)
