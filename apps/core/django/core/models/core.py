import string
import random
from django.db import models
from .template import BaseModel
from django.conf import settings
from django.contrib.auth.models import User


RESERVED_KEYNAMES = ["core", "admin", "system"]


def generate_random_slug(length=10):
    characters = string.ascii_lowercase + string.digits
    return "".join(random.choices(characters, k=length))


class ChangeLog(BaseModel):
    model_name = models.CharField(max_length=255)
    object_id = models.CharField(max_length=10)
    field_name = models.CharField(max_length=255)
    old_value = models.TextField(null=True, blank=True)
    new_value = models.TextField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"ChangeLog for {self.model_name} {self.object_id} at {self.timestamp}"


class AbstractApp(BaseModel):
    status = models.CharField(max_length=255, default="Active")
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    id = models.CharField(max_length=10, primary_key=True, unique=True, editable=False)

    class Meta:
        abstract = True

    def __str__(self):
        return f"{self.name}"

    def save(self, *args, **kwargs):
        request = kwargs.pop("request", None)
        if not self.id:
            base_id = self.name.lower().replace(" ", "_")[:10]
            unique_id = base_id
            num = 1

            # Check if the generated ID is in the reserved key names
            while (
                unique_id in RESERVED_KEYNAMES
                or self.__class__.objects.filter(id=unique_id).exists()
            ):
                unique_id = f"{base_id[:9]}{num}"
                num += 1

            self.id = unique_id

        # Track changes
        if self.pk:
            old_instance = self.__class__.objects.get(pk=self.pk)
            for field in self._meta.fields:
                field_name = field.name
                old_value = str(getattr(old_instance, field_name))
                new_value = str(getattr(self, field_name))
                if old_value != new_value:
                    ChangeLog.objects.create(
                        model_name=self.__class__.__name__,
                        object_id=self.id,
                        field_name=field_name,
                        old_value=old_value,
                        new_value=new_value,
                        user=request.user if request else None,
                    )

        super(AbstractApp, self).save(*args, **kwargs)


class App(AbstractApp):
    pass


class Module(AbstractApp):
    app = models.ForeignKey(App, on_delete=models.CASCADE, related_name="modules")

    def __str__(self):
        return f"{self.name} {self.app}"


class Document(AbstractApp):
    TYPE_CHOICES = [
        ("single", "Single"),
        ("list", "List"),
        ("dynamic", "Dynamic"),
    ]
    app = models.ForeignKey(App, on_delete=models.CASCADE, related_name="app")

    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name="modules")
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, default="list")

    def __str__(self):
        return f"{self.name} - {self.module}"
