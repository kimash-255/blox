from django.db import models
from django.utils.text import slugify
import string
import random


def generate_random_slug(length=10):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choices(characters, k=length))


class BaseModel(models.Model):
    id = models.CharField(
        max_length=100,
        primary_key=True,
        unique=True,
        default=generate_random_slug,
        editable=False
    )
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
