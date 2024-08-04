# new.py
from rest_framework import serializers
from new.models.new import *

class NewSerializer(serializers.ModelSerializer):
    class Meta:
        model = New
        fields = '__all__'

