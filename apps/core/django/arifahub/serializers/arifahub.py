# arifahub.py
from rest_framework import serializers
from arifahub.models.arifahub import *

class NexttSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nextt
        fields = '__all__'

class DavidSerializer(serializers.ModelSerializer):
    class Meta:
        model = David
        fields = '__all__'

