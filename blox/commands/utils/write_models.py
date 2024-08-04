import json
import os
import click


def write_model_fields(module_file, model_file, folder_path):
    """Write model fields based on fields.json in the given folder path."""
    fields_file_path = os.path.join(folder_path, "fields.json")
    if not os.path.exists(fields_file_path):
        module_file.write(f"    pass\n\n")
        return

    with open(fields_file_path, "r") as fields_file:
        fields_data = fields_file.read()

    try:
        field_list = json.loads(fields_data)
    except (json.JSONDecodeError, AttributeError):
        module_file.write(f"    pass\n\n")
        click.echo(f"Error reading fieldList from {fields_file_path}.")
        return

    if not field_list:
        module_file.write(f"    pass\n\n")
        return

    FIELD_TYPE_MAP = {
        "TextField": {"type": "models.TextField"},
        "CharField": {"type": "models.CharField", "max_length": 255},
        "NumberField": {"type": "models.IntegerField"},
        "FloatField": {"type": "models.FloatField"},
        "DecimalField": {
            "type": "models.DecimalField",
            "max_digits": 10,
            "decimal_places": 2,
        },
        "BooleanField": {"type": "models.BooleanField"},
        "DateField": {"type": "models.DateField"},
        "DateTimeField": {"type": "models.DateTimeField"},
        "TimeField": {"type": "models.TimeField"},
        "EmailField": {"type": "models.EmailField", "max_length": 254},
        "URLField": {"type": "models.URLField"},
        "SlugField": {"type": "models.SlugField", "max_length": 50},
        "UUIDField": {"type": "models.UUIDField"},
        "IPAddressField": {"type": "models.GenericIPAddressField"},
        "FileField": {"type": "models.FileField", "upload_to": "'uploads/'"},
        "ImageField": {"type": "models.ImageField", "upload_to": "'images/'"},
        "PasswordField": {"type": "models.CharField", "max_length": 128},
        "PhoneField": {"type": "models.CharField", "max_length": 15},
        "NameField": {"type": "models.CharField", "max_length": 255},
        "AddressField": {"type": "models.TextField"},
        "SelectField": {
            "type": "models.CharField",
            "max_length": 255,
        },
        "SmallTextField": {"type": "models.CharField", "max_length": 100},
        "ForeignKey": {
            "type": "models.ForeignKey",
            "on_delete": "models.CASCADE",
        },
        "OneToOneField": {
            "type": "models.OneToOneField",
            "on_delete": "models.CASCADE",
        },
        "ManyToManyField": {"type": "models.ManyToManyField"},
    }
    for field in field_list:
        field_id = field.get("id", "")
        field_name = field.get("name", "")
        type = field["type"]
        field_type_info = FIELD_TYPE_MAP[type].copy()
        # Check for required and default values
        required = field.get("required", False)
        default = field.get("default", None)
        null = not required
        blank = not required

        # Handle SelectField separately for choices
        if type == "SelectField":
            choices = field.get("options", [])
            choices_str = ", ".join([f"('{choice}', '{choice}')" for choice in choices])
            options_var = f"CHOICES_{field_id.upper()}"
            module_file.write(f"    {options_var} = [\n")
            for choice in choices:
                module_file.write(f"        ('{choice}', '{choice}'),\n")
            module_file.write("    ]\n")
            field_type_info["choices"] = options_var
            field_type_info["type"] = "models.CharField"

        if type in ["ForeignKey", "OneToOneField", "ManyToManyField"]:
            related_model = field.get("doc", "'self'")
            field_type = field_type_info.pop("type")

            # Write the field with the related model as the first argument
            module_file.write(
                f"    {field_id} = {field_type}('{related_model}', verbose_name='{field_name}', null={str(null).capitalize()}, blank={str(blank).capitalize()}"
                f"{f', default=\"{default}\"' if default is not None else ''}"
            )

        else:
            # Write the field without the related model as the first argument
            field_type = field_type_info.pop("type")
            module_file.write(
                f"    {field_id} = {field_type}(verbose_name='{field_name}', null={str(null).capitalize()}, blank={str(blank).capitalize()}"
                f"{f', default=\"{default}\"' if default is not None else ''}"
            )

        field_params = ", ".join(
            [f"{key}={value}" for key, value in field_type_info.items()]
        )
        if field_params:
            module_file.write(f", {field_params}")
        module_file.write(")\n")
