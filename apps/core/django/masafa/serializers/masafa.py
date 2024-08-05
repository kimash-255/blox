from rest_framework import serializers
from masafa.models.masafa import *

class SaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Say
        fields = '__all__'

class ColdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cold
        fields = '__all__'

class DanciSerializer(serializers.ModelSerializer):
    class Meta:
        model = Danci
        fields = '__all__'

