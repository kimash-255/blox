# serializers.py
from rest_framework import serializers
from core.models import OTP, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class OTPSerializer(serializers.ModelSerializer):
    class Meta:
        model = OTP
        fields = "__all__"
