# arifahub.py
from rest_framework import viewsets
from core.views.template import GenericViewSet
from arifahub.models.arifahub import *
from arifahub.filters.arifahub import *
from arifahub.serializers.arifahub import *

class MeetingViewSet(GenericViewSet):
    queryset = Meeting.objects.all()
    filterset_class = MeetingFilter
    serializer_class = MeetingSerializer

class DavidViewSet(GenericViewSet):
    queryset = David.objects.all()
    filterset_class = DavidFilter
    serializer_class = DavidSerializer

