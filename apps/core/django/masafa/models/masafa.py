from django.db import models
from core.models import BaseModel
import uuid

class Say(BaseModel):
    booleanfield_1 = models.BooleanField(verbose_name='BooleanField 1', null=True, blank=True)
    CHOICES_SELECTFIELD_1 = [
    ]
    selectfield_1 = models.CharField(verbose_name='SelectField 1', null=True, blank=True, max_length=255, choices=CHOICES_SELECTFIELD_1)
    foreignkey_1 = models.ForeignKey('Cold', verbose_name='ForeignKey 1', null=True, blank=True, on_delete=models.CASCADE)
    manytomanyfield_1 = models.ManyToManyField('Danci', verbose_name='ManyToManyField 1', null=True, blank=True)
    id = models.CharField(primary_key=True, max_length=6, default='000000')
    def save(self, *args, **kwargs):
        if self.id == '000000':
            self.id = self.get_next_id()
        super().save(*args, **kwargs)
    def get_next_id(self):
        from django.db.models import Max
        last_entry = Say.objects.order_by('-created_at').first()
        if last_entry is None:
            last_id = '000000'
        else:
            last_id = last_entry.id
        last_id_int = int(last_id)
        next_id_int = last_id_int + 1
        return str(next_id_int).zfill(6)
class Cold(BaseModel):
    decimalfield_1 = models.DecimalField(verbose_name='DecimalField 1', null=True, blank=True, max_digits=10, decimal_places=2)
    emailfield_1 = models.EmailField(verbose_name='EmailField ', null=True, blank=True, max_length=254)
    id = models.CharField(primary_key=True, max_length=6, default='000000')
    def save(self, *args, **kwargs):
        if self.id == '000000':
            self.id = self.get_next_id()
        super().save(*args, **kwargs)
    def get_next_id(self):
        from django.db.models import Max
        last_entry = Cold.objects.order_by('-created_at').first()
        if last_entry is None:
            last_id = '000000'
        else:
            last_id = last_entry.id
        last_id_int = int(last_id)
        next_id_int = last_id_int + 1
        return str(next_id_int).zfill(6)
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
