import json
import os
import click


def write_filter_fields(filter_file, model_name, folder_path):
    """Write filter fields for a given model, only including fields where filter is true."""
    fields_file_path = os.path.join(folder_path, "fields.json")
    if not os.path.exists(fields_file_path):
        filter_file.write(f"    pass\n\n")
        return

    with open(fields_file_path, "r") as fields_file:
        fields_data = fields_file.read()

    try:
        field_list = json.loads(fields_data)
    except (json.JSONDecodeError, AttributeError):
        filter_file.write(f"    pass\n\n")
        click.echo(f"Error reading fieldList from {fields_file_path}.")
        return

    filter_fields = [field["id"] for field in field_list if field.get("filter", False)]

    filter_file.write(f"class {model_name}Filter(filters.FilterSet):\n")
    if filter_fields:
        filter_file.write(f"    class Meta:\n")
        filter_file.write(f"        model = {model_name}\n")
        filter_file.write(f"        fields = {filter_fields}\n\n")
    else:
        filter_file.write("    pass\n\n")
