import django_filters as filters
from masafa.models.masafa import *

class DanciFilter(filters.FilterSet):
    class Meta:
        model = Danci
        fields = ['datefield', 'charfield_1', 'decimalfield_1']

