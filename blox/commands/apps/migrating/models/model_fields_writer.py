from .field_mappings import FIELD_TYPE_MAP


def write_model(module_file, field_list):
    """Write model fields based on the field list."""
    for field in field_list:
        field_id = field.get("id", "")
        field_name = field.get("name", "")
        type = field["type"]
        field_type_info = FIELD_TYPE_MAP[type].copy()

        required = field.get("required", False)
        default = field.get("default", None)
        null = not required
        blank = not required

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
            module_file.write(
                f"    {field_id} = {field_type}('{related_model}', verbose_name='{field_name}', null={str(null).capitalize()}, blank={str(blank).capitalize()}"
                f"{f', default=\"{default}\"' if default is not None else ''}"
            )
        else:
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
