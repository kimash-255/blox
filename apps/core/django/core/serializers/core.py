from rest_framework import serializers
from core.models import App, Document, Module


class AppSerializer(serializers.ModelSerializer):
    class Meta:
        model = App
        fields = "__all__"
 

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = "__all__"
        

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = "__all__"
