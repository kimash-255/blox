import django_filters as filters
from masafa.models.masafa import *

class SayFilter(filters.FilterSet):
    class Meta:
        model = Say
        fields = ['selectfield_1', 'foreignkey_1']

class ColdFilter(filters.FilterSet):
    class Meta:
        model = Cold
        fields = ['decimalfield_1', 'emailfield_1']

class DanciFilter(filters.FilterSet):
    class Meta:
        model = Danci
        fields = ['datefield', 'charfield_1', 'decimalfield_1']

