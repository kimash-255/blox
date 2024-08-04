# logistics.py
from rest_framework import viewsets
from core.views.template import GenericViewSet
from logistics.models.logistics import *
from logistics.filters.logistics import *
from logistics.serializers.logistics import *

class ItemViewSet(GenericViewSet):
    queryset = Item.objects.all()
    filterset_class = ItemFilter
    serializer_class = ItemSerializer

