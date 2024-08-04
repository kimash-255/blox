# my_app.py
from rest_framework import serializers
from my_app.models.my_app import *

class TrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Try
        fields = '__all__'

class TurnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turn
        fields = '__all__'

