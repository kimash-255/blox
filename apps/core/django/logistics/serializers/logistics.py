from rest_framework import serializers
from logistics.models.logistics import *

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

