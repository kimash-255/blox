from rest_framework import serializers
from masafa.models.masafa import *

class ColdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cold
        fields = '__all__'

class DanciSerializer(serializers.ModelSerializer):
    class Meta:
        model = Danci
        fields = '__all__'

class SaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Say
        fields = '__all__'

