# meeting.py
from rest_framework import viewsets
from core.views.template import GenericViewSet
from meeting.models.meeting import *
from meeting.filters.meeting import *
from meeting.serializers.meeting import *

class DavidViewSet(GenericViewSet):
    queryset = David.objects.all()
    filterset_class = DavidFilter
    serializer_class = DavidSerializer

