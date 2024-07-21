import string
import random
from django.db import models
from django.utils.text import slugify
from .template import BaseModel  # Assuming BaseModel is defined in template.py


def generate_random_slug(length=10):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choices(characters, k=length))


class App(BaseModel):
    status = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    id = models.CharField(
        max_length=10,
        primary_key=True,
        unique=True,
        editable=False
    )

    def __str__(self):
        return f"{self.name}: {self.status}"

    def save(self, *args, **kwargs):
        if not self.id:
            base_slug = slugify(self.name)
            # Ensure the slug is within 10 characters
            unique_slug = base_slug[:10]
            num = 1
            while App.objects.filter(id=unique_slug).exists():
                # Adjust length to fit 10 characters
                unique_slug = f"{base_slug[:9]}{num}"
                num += 1
            self.id = unique_slug
        super(App, self).save(*args, **kwargs)


class Module(App):
    app = models.ForeignKey(
        App, on_delete=models.CASCADE, related_name='modules')

    def __str__(self):
        return f"{self.name}: {self.app}"
