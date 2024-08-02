# arifahub.py
import django_filters as filters
from arifahub.models.arifahub import *

class MeetingFilter(filters.FilterSet):
    class Meta:
        model = Meeting
        fields = '__all__'

class DavidFilter(filters.FilterSet):
    class Meta:
        model = David
        fields = '__all__'

