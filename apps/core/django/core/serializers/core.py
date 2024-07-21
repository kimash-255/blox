from rest_framework import serializers
from core.models import App, Module


class AppSerializer(serializers.ModelSerializer):
    class Meta:
        model = App
        fields = "__all__"


class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = "__all__"
