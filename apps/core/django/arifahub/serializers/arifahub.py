# arifahub.py
from rest_framework import serializers
from arifahub.models.arifahub import *

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = '__all__'

class DavidSerializer(serializers.ModelSerializer):
    class Meta:
        model = David
        fields = '__all__'

