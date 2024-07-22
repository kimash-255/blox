import string
import random
from django.db import models
from .template import BaseModel


def generate_random_slug(length=10):
    characters = string.ascii_lowercase + string.digits
    return ''.join(random.choices(characters, k=length))


class AbstractApp(BaseModel):
    status = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    id = models.CharField(
        max_length=10,
        primary_key=True,
        unique=True,
        editable=False
    )

    class Meta:
        abstract = True

    def __str__(self):
        return f"{self.name}: {self.status}"

    def save(self, *args, **kwargs):
        if not self.id:

            base_id = self.name.lower().replace(' ', '_')[:10]
            unique_id = base_id
            num = 1
            while self.__class__.objects.filter(id=unique_id).exists():

                unique_id = f"{base_id[:9]}{num}"
                num += 1
            self.id = unique_id
        super(AbstractApp, self).save(*args, **kwargs)


class App(AbstractApp):
    pass


class Module(AbstractApp):
    app = models.ForeignKey(
        App, on_delete=models.CASCADE, related_name='modules')

    def __str__(self):
        return f"{self.name} {self.app}"
