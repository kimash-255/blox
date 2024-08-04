# new.py
from rest_framework import viewsets
from core.views.template import GenericViewSet
from new.models.new import *
from new.filters.new import *
from new.serializers.new import *

class NewViewSet(GenericViewSet):
    queryset = New.objects.all()
    filterset_class = NewFilter
    serializer_class = NewSerializer

