# arifahub.py
import django_filters as filters
from arifahub.models.arifahub import *

class NexttFilter(filters.FilterSet):
    class Meta:
        model = Nextt
        fields = '__all__'

class DavidFilter(filters.FilterSet):
    class Meta:
        model = David
        fields = '__all__'

