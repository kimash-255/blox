from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout as django_logout
from rest_framework.authtoken.models import Token as AuthToken
from django.utils.crypto import get_random_string
from core.models import OTP
from core.serializers import UserSerializer, OTPSerializer
from django.conf import settings
import requests
import json


class LoginView(APIView):
    def post(self, request):
        username = request.data["username"]
        password = request.data["password"]
        user = authenticate(username=username, password=password)
        if user is not None:
            otp_code = get_random_string(length=6, allowed_chars="0123456789")
            OTP.objects.update_or_create(
                user=user, defaults={"otp_code": otp_code, "is_active": False}
            )

            send_sms(user.phone, otp_code)
            return Response(
                {"detail": "OTP sent to registered phone number."},
                status=status.HTTP_200_OK,
            )


class OTPActivationView(APIView):
    def post(self, request):
        otp_code = request.data["otp"]
        try:
            otp = OTP.objects.get(otp_code=otp_code, is_active=False)
            otp.is_active = True
            otp.save()
            user = otp.user

            token, created = AuthToken.objects.get_or_create(user=user)

            login(request, user)

            return Response({"token": token.key}, status=status.HTTP_200_OK)
        except OTP.DoesNotExist:
            return Response(
                {"detail": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST
            )


class LogoutView(APIView):
    def post(self, request):
        django_logout(request)
        return Response(
            {"detail": "Logged out successfully."}, status=status.HTTP_200_OK
        )


def send_sms(phone_number, otp_code):

    api_url = "https://api.softleek.com/sms/send"

    message = f"Hi there! Your OTP code for verification is {otp_code}. Please use this code to complete your login process."

    payload = {"phone": phone_number, "message": message, "sender_id": "SOFTLEEK"}

    json_payload = json.dumps(payload)

    headers = {"Content-Type": "application/json", "Accept": "application/json"}

    response = requests.post(api_url, data=json_payload, headers=headers)

    if response.status_code != 200:

        try:
            response_data = response.json()
        except ValueError:
            response_data = response.text

        raise Exception(
            f"Failed to send SMS. Status code: {response.status_code}, Response: {response_data}"
        )
