from rest_framework import viewsets
from core.views.template import GenericViewSet
from masafa.models.masafa import *
from masafa.filters.masafa import *
from masafa.serializers.masafa import *

class DanciViewSet(GenericViewSet):
    queryset = Danci.objects.all()
    filterset_class = DanciFilter
    serializer_class = DanciSerializer

