# meeting.py
from rest_framework import serializers
from meeting.models.meeting import *

class DavidSerializer(serializers.ModelSerializer):
    class Meta:
        model = David
        fields = '__all__'

