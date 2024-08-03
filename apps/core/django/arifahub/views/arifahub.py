# arifahub.py
from rest_framework import viewsets
from core.views.template import GenericViewSet
from arifahub.models.arifahub import *
from arifahub.filters.arifahub import *
from arifahub.serializers.arifahub import *

class NexttViewSet(GenericViewSet):
    queryset = Nextt.objects.all()
    filterset_class = NexttFilter
    serializer_class = NexttSerializer

class DavidViewSet(GenericViewSet):
    queryset = David.objects.all()
    filterset_class = DavidFilter
    serializer_class = DavidSerializer

