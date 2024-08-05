from rest_framework import viewsets
from core.views.template import GenericViewSet
from masafa.models.masafa import *
from masafa.filters.masafa import *
from masafa.serializers.masafa import *

class ColdViewSet(GenericViewSet):
    queryset = Cold.objects.all()
    filterset_class = ColdFilter
    serializer_class = ColdSerializer

class DanciViewSet(GenericViewSet):
    queryset = Danci.objects.all()
    filterset_class = DanciFilter
    serializer_class = DanciSerializer

class SayViewSet(GenericViewSet):
    queryset = Say.objects.all()
    filterset_class = SayFilter
    serializer_class = SaySerializer

