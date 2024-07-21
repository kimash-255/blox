from .template import DynamicFilterSet
from core.models import (
    App, Module
)


class AppFilter(DynamicFilterSet):
    class Meta:
        model = App
        fields = "__all__"


class ModuleFilter(DynamicFilterSet):
    class Meta:
        model = Module
        fields = "__all__"
