import os
import click
from .models.json_loader import load_json_file
from .models.id_naming import write_id_field
from .models.model_fields_writer import write_model


def write_model_fields(module_file, model_file, folder_path):
    """Write model fields based on fields.json and settings.json in the given folder path."""
    fields_file_path = os.path.join(folder_path, "fields.json")
    settings_file_path = os.path.join(folder_path, "settings.json")

    field_list = load_json_file(fields_file_path)
    if field_list is None:
        module_file.write("    pass\n\n")
        return

    settings = load_json_file(settings_file_path)
    if settings is None:
        click.echo(f"Error: settings.json not found in {folder_path}.")
        return

    write_id_field(module_file, settings)
    write_model(module_file, field_list)
