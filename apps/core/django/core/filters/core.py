from .template import DynamicFilterSet
from core.models import (
    App, Document, Module
)


class AppFilter(DynamicFilterSet):
    class Meta:
        model = App
        fields = "__all__"


class ModuleFilter(DynamicFilterSet):
    class Meta:
        model = Module
        fields = "__all__"


class DocumentFilter(DynamicFilterSet):
    class Meta:
        model = Document
        fields = "__all__"
