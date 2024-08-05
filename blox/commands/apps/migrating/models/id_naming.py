import uuid
import click
import re


def write_id_field(module_file, settings, model_name):
    """Write the id field based on settings."""
    id_naming_method = settings.get("idNamingMethod", "incrementalNaming")
    id_naming_rule = settings.get("idNamingRule", "")
    field_for_id_naming = settings.get("fieldForIdNaming", "")
    function_for_id_naming = settings.get("functionForIdNaming", "")
    length_for_incremental_naming = settings.get("lengthForIncrementalNaming", 6)

    try:
        if id_naming_method == "fieldNaming" and field_for_id_naming:
            module_file.write(
                f"    id = models.CharField(primary_key=True, max_length=255, editable=False)\n"
                f"    def save(self, *args, **kwargs):\n"
                f"        if self.{field_for_id_naming}:\n"
                f"            self.id = str(self.{field_for_id_naming})\n"
                f"        super().save(*args, **kwargs)\n"
            )
        elif id_naming_method == "functionNaming" and function_for_id_naming:
            module_file.write(
                f"    id = models.CharField(primary_key=True, max_length=255, default={function_for_id_naming})\n"
            )
        elif id_naming_method == "incrementalNaming":
            padded_length = int(length_for_incremental_naming)
            module_file.write(
                f"    id = models.CharField(primary_key=True, max_length={padded_length}, default='000000')\n"
                f"    def save(self, *args, **kwargs):\n"
                f"        if self.id == '000000':\n"
                f"            self.id = self.get_next_id()\n"
                f"        super().save(*args, **kwargs)\n"
                f"    def get_next_id(self):\n"
                f"        from django.db.models import Max\n"
                f"        last_entry = {model_name}.objects.order_by('-created_at').first()\n"
                f"        if last_entry is None:\n"
                f"            last_id = '000000'\n"
                f"        else:\n"
                f"            last_id = last_entry.id\n"
                f"        last_id_int = int(last_id)\n"
                f"        next_id_int = last_id_int + 1\n"
                f"        return str(next_id_int).zfill({padded_length})\n"
            )
        elif id_naming_method == "randomNaming":
            module_file.write(
                f"    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)\n"
            )
        elif id_naming_method == "customNaming" and id_naming_rule:
            # Save default formula and write save method
            module_file.write(
                f"    id = models.CharField(primary_key=True, max_length=255, default='{id_naming_rule}')\n"
                f"    def save(self, *args, **kwargs):\n"
                f"        if self.id == '{id_naming_rule}':\n"
                f"            self.id = self.generate_custom_id()\n"
                f"        super().save(*args, **kwargs)\n"
                f"    def generate_custom_id(self):\n"
                f"        from core.models.template import generate_custom_id\n"
                f"        return generate_custom_id('{id_naming_rule}', self)\n"
            )
        else:
            module_file.write(f"    id = models.AutoField(primary_key=True)\n")
            click.echo(
                f"Warning: Unrecognized idNamingMethod '{id_naming_method}'. Defaulting to incrementalNaming."
            )
    except Exception as e:
        click.echo(f"Error writing id field: {e}")
        # Optionally, you might want to handle logging or other error recovery here
