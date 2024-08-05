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


class LoginView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            user = authenticate(username=username, password=password)
            if user is not None:
                otp_code = get_random_string(length=6, allowed_chars="0123456789")
                OTP.objects.update_or_create(
                    user=user, defaults={"otp_code": otp_code, "is_active": False}
                )
                # Replace with your SMS sending function
                send_sms(user.phone, otp_code)
                return Response(
                    {"detail": "OTP sent to registered phone number."},
                    status=status.HTTP_200_OK,
                )
            return Response(
                {"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OTPActivationView(APIView):
    def post(self, request):
        serializer = OTPSerializer(data=request.data)
        if serializer.is_valid():
            otp_code = serializer.validated_data["otp_code"]
            try:
                otp = OTP.objects.get(otp_code=otp_code, is_active=False)
                otp.is_active = True
                otp.save()
                user = otp.user

                # Generate or retrieve the token
                token, created = AuthToken.objects.get_or_create(user=user)

                # Log the user in
                login(request, user)

                return Response({"token": token.key}, status=status.HTTP_200_OK)
            except OTP.DoesNotExist:
                return Response(
                    {"detail": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request):
        django_logout(request)
        return Response(
            {"detail": "Logged out successfully."}, status=status.HTTP_200_OK
        )


def send_sms(phone_number, otp_code):
    # Example implementation of sending an SMS
    # Replace with your SMS gateway integration
    api_url = "https://example-sms-gateway.com/send"
    api_key = settings.SMS_API_KEY
    message = f"Your OTP code is {otp_code}"

    payload = {"to": phone_number, "message": message, "api_key": api_key}

    response = requests.post(api_url, data=payload)
    if response.status_code != 200:
        raise Exception("Failed to send SMS")
