from decouple import config
from django.core.mail import send_mail
from django.conf import settings

# Load environment variables from .env
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = config("EMAIL_HOST")
EMAIL_PORT = config("EMAIL_PORT", cast=int)
EMAIL_HOST_USER = config("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD")
EMAIL_USE_TLS = config("EMAIL_USE_TLS", default=False, cast=bool)
EMAIL_USE_SSL = config("EMAIL_USE_SSL", default=False, cast=bool)
EMAIL_SSL_CERTFILE = config("EMAIL_SSL_CERTFILE")
EMAIL_SSL_KEYFILE = config("EMAIL_SSL_KEYFILE")
EMAIL_TIMEOUT = config("EMAIL_TIMEOUT", default=10, cast=int)
EMAIL_SSL_CAFILE = config("EMAIL_SSL_CAFILE")

# Configure Django settings
settings.configure(
    EMAIL_BACKEND=EMAIL_BACKEND,
    EMAIL_HOST=EMAIL_HOST,
    EMAIL_PORT=EMAIL_PORT,
    EMAIL_HOST_USER=EMAIL_HOST_USER,
    EMAIL_HOST_PASSWORD=EMAIL_HOST_PASSWORD,
    EMAIL_USE_TLS=EMAIL_USE_TLS,
    EMAIL_USE_SSL=EMAIL_USE_SSL,
    EMAIL_SSL_CERTFILE=EMAIL_SSL_CERTFILE,
    EMAIL_SSL_KEYFILE=EMAIL_SSL_KEYFILE,
    EMAIL_TIMEOUT=EMAIL_TIMEOUT,
    EMAIL_SSL_CAFILE=EMAIL_SSL_CAFILE,
)

# Attempt to send a test email
try:
    send_mail(
        'Test Email',
        'This is a test email.',
        'Arifahub <blog@arifahub.com>',  # Update sender name here
        ['vadesdakey@gmail.com'],
        fail_silently=False,
    )
    print("Test email sent successfully!")
except Exception as e:
    print(f"Error sending test email: {e}")
