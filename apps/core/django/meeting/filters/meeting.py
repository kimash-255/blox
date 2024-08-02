# meeting.py
import django_filters as filters
from meeting.models.meeting import *

class DavidFilter(filters.FilterSet):
    class Meta:
        model = David
        fields = '__all__'

