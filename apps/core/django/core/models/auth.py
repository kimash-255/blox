# models.py
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission


class User(AbstractUser):
    ROLE_CHOICES = (
        ("customer", "Customer"),
        ("staff", "Staff"),
        ("admin", "Admin"),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="subscriber")
    groups = models.ManyToManyField(
        Group, related_name="api_user_groups", blank=True  # Add a unique related name
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="api_user_permissions",  # Add a unique related name
        blank=True,
    )
    profile_picture = models.URLField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    birthdate = models.DateField(blank=True, null=True)

    phone = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return self.username


class OTP(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    otp_code = models.CharField(max_length=6)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
