# my_app.py
import django_filters as filters
from my_app.models.my_app import *

class TryFilter(filters.FilterSet):
    class Meta:
        model = Try
        fields = '__all__'

class TurnFilter(filters.FilterSet):
    class Meta:
        model = Turn
        fields = '__all__'

