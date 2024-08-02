

class Doggy(BaseModel):
    textfield_1 = models.TextField(verbose_name='TextField 1', null=True, blank=True)
    numberfield_1 = models.IntegerField(verbose_name='NumberField 1', null=True, blank=True)
    floatfield_1 = models.FloatField(verbose_name='FloatField 1', null=True, blank=True)
    floatfield_1 = models.FloatField(verbose_name='FloatField 1', null=True, blank=True)
    decimalfield_1 = models.DecimalField(verbose_name='DecimalField 1', null=True, blank=True, max_digits=10, decimal_places=2)
    charfield_1 = models.CharField(verbose_name='CharField 1', null=True, blank=True, max_length=255)
    charfield_2 = models.CharField(verbose_name='CharField 2', null=True, blank=True, max_length=255)
    decimalfield_1 = models.DecimalField(verbose_name='DecimalField 1', null=True, blank=True, max_digits=10, decimal_places=2)
    datefield_1 = models.DateField(verbose_name='DateField 1', null=True, blank=True)
    booleanfield_1 = models.BooleanField(verbose_name='BooleanField 1', null=True, blank=True)
    decimalfield_2 = models.DecimalField(verbose_name='DecimalField 2', null=True, blank=True, max_digits=10, decimal_places=2)
    datefield_1 = models.DateField(verbose_name='DateField 1', null=True, blank=True)
    datetimefield_1 = models.DateTimeField(verbose_name='DateTimeField 1', null=True, blank=True)


