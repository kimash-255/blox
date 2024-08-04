# new.py
import django_filters as filters
from new.models.new import *

class NewFilter(filters.FilterSet):
    class Meta:
        model = New
        fields = '__all__'

