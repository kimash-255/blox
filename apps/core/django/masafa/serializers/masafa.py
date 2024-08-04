from rest_framework import serializers
from masafa.models.masafa import *

class DanciSerializer(serializers.ModelSerializer):
    class Meta:
        model = Danci
        fields = '__all__'

