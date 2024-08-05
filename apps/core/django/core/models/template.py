from django.db import models
from django.conf import settings
from django.utils.text import slugify
import string
import random

import re


def generate_random_slug(length=10):
    characters = string.ascii_letters + string.digits
    return "".join(random.choices(characters, k=length))


class BaseModel(models.Model):
    id = models.CharField(
        max_length=100,
        primary_key=True,
        unique=True,
        default=generate_random_slug,
        editable=False,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


import re


def generate_custom_id(default_formula, self):
    """Generate an ID based on the default formula and the object's fields."""
    parts = []

    # Function to replace auto-naming parts
    def replace_auto_naming(part):
        if "#" in part:
            count = len(part)
            # Get the last entry's ID to calculate the next ID
            last_entry = self.__class__.objects.order_by("-created_at").first()
            if last_entry:
                last_id = last_entry.id
                # Extract the numeric part of the ID
                last_numeric_part = re.search(r"(\d+)$", last_id)
                if last_numeric_part:
                    last_numeric_part = last_numeric_part.group(0)
                    next_id_numeric = str(int(last_numeric_part) + 1).zfill(count)
                else:
                    next_id_numeric = "1".zfill(count)
            else:
                next_id_numeric = "1".zfill(count)

            return next_id_numeric
        return part

    # Process the formula
    regex = re.compile(r"{{.*?}}|#+")
    last_index = 0

    for match in regex.finditer(default_formula):
        start, end = match.span()
        part = default_formula[last_index:start]
        if part:
            parts.append(part)
        last_index = end

        if match.group().startswith("{{") and match.group().endswith("}}"):
            field_name = match.group()[2:-2]  # Remove {{ and }}
            field_value = getattr(self, field_name, "")
            parts.append(str(field_value))
        else:
            parts.append(replace_auto_naming(match.group()))

    # Append any remaining part after the last match
    remaining_part = default_formula[last_index:]
    if remaining_part:
        parts.append(remaining_part)

    return "".join(parts)
