import django_filters as filters
from logistics.models.logistics import *

class ItemFilter(filters.FilterSet):
    class Meta:
        model = Item
        fields = ['name']

