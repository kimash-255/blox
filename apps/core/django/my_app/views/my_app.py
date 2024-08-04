# my_app.py
from rest_framework import viewsets
from core.views.template import GenericViewSet
from my_app.models.my_app import *
from my_app.filters.my_app import *
from my_app.serializers.my_app import *

class TryViewSet(GenericViewSet):
    queryset = Try.objects.all()
    filterset_class = TryFilter
    serializer_class = TrySerializer

class TurnViewSet(GenericViewSet):
    queryset = Turn.objects.all()
    filterset_class = TurnFilter
    serializer_class = TurnSerializer

