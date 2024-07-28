from django_filters import rest_framework as filters
from core.models import App, Document, Module
from .template import DynamicFilterSet

class AppFilter(DynamicFilterSet):
    class Meta:
        model = App
        fields = "__all__"
        exclude = ['edit_history']  

class ModuleFilter(DynamicFilterSet):
    class Meta:
        model = Module
        fields = "__all__"
        exclude = ['edit_history']  

class DocumentFilter(DynamicFilterSet):
    class Meta:
        model = Document
        fields = "__all__"
        exclude = ['edit_history']  
