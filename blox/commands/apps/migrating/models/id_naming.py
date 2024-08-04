import uuid
import click


def write_id_field(module_file, settings):
    """Write the id field based on settings."""
    id_naming_method = settings.get("idNamingMethod", "incrementalNaming")
    id_naming_rule = settings.get("idNamingRule", "")
    field_for_id_naming = settings.get("fieldForIdNaming", "")
    length_for_incremental_naming = settings.get("lengthForIncrementalNaming", 6)

    try:
        if id_naming_method == "fieldNaming" and field_for_id_naming:
            module_file.write(
                f"    id = models.CharField(primary_key=True, max_length=255)\n"
            )
        elif id_naming_method == "functionNaming" and id_naming_rule:
            module_file.write(
                f"    id = models.CharField(primary_key=True, max_length=255)\n"
            )
        elif id_naming_method == "incrementalNaming":
            module_file.write(f"    id = models.AutoField(primary_key=True)\n")
        elif id_naming_method == "randomNaming":
            module_file.write(
                f"    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)\n"
            )
        elif id_naming_method == "customNaming" and id_naming_rule:
            module_file.write(
                f"    id = models.CharField(primary_key=True, max_length=255)\n"
            )
        else:
            # Handle cases where id_naming_method is not recognized
            module_file.write(f"    id = models.AutoField(primary_key=True)\n")
            click.echo(
                f"Warning: Unrecognized idNamingMethod '{id_naming_method}'. Defaulting to incrementalNaming."
            )
    except Exception as e:
        click.echo(f"Error writing id field: {e}")
        # Optionally, you might want to handle logging or other error recovery here
