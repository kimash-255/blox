import os
import click
from ...config import BASE_PATH, CUSTOM_APPS_PATH
from .write_models import write_model_fields
from .write_filters import write_filter_fields
from .update_urls import underscore_to_titlecase

MODULES_FOLDER = {
    "views": "views",
    "models": "models",
    "filters": "filters",
    "serializers": "serializers",
}


def write_serializer_fields(serializer_file, model_name, fields):
    """Write serializer fields for a given model."""
    serializer_file.write(
        f"class {model_name}Serializer(serializers.ModelSerializer):\n"
    )
    serializer_file.write(f"    class Meta:\n")
    serializer_file.write(f"        model = {model_name}\n")
    serializer_file.write(f"        fields = '__all__'\n\n")


def write_viewset(view_file, model_name, module_name):
    """Write viewset for a given model."""
    view_file.write(f"class {model_name}ViewSet(GenericViewSet):\n")
    view_file.write(f"    queryset = {model_name}.objects.all()\n")
    view_file.write(f"    filterset_class = {model_name}Filter\n")
    view_file.write(f"    serializer_class = {model_name}Serializer\n\n")


def migrate_doc(app_name, module, doc):
    """Migrate a specific document within a module and app."""
    click.echo(f"Processing '{doc}' in module '{module}' for app '{app_name}'...")

    for folder, module_name in MODULES_FOLDER.items():
        module_folder_path = os.path.join(BASE_PATH, app_name, folder)
        module_file_path = os.path.join(module_folder_path, f"{module}.py")
        custom_app_path = os.path.join(CUSTOM_APPS_PATH, app_name)

        if not os.path.exists(module_folder_path):
            os.makedirs(module_folder_path, exist_ok=True)

        if os.path.exists(module_file_path):
            with open(module_file_path, "r") as module_file:
                existing_lines = module_file.readlines()

            new_lines = []
            skip_block = False
            for line in existing_lines:
                if line.startswith(f"class {underscore_to_titlecase(doc)}"):
                    skip_block = True
                if skip_block and line.strip() == "":
                    skip_block = False
                    continue
                if not skip_block:
                    new_lines.append(line)

            with open(module_file_path, "w") as module_file:
                module_file.writelines(new_lines)

        with open(module_file_path, "a") as module_file:
            doc_folder_path = os.path.join(custom_app_path, module, "doc")
            if os.path.exists(doc_folder_path):
                folder_path = os.path.join(doc_folder_path, doc)
                if os.path.isdir(folder_path):
                    model_name = underscore_to_titlecase(doc)
                    if folder == "models":
                        module_file.write(f"class {model_name}(BaseModel):\n")
                        write_model_fields(module_file, module_file_path, folder_path)
                    elif folder == "views":
                        write_viewset(module_file, model_name, module)
                    elif folder == "serializers":
                        write_serializer_fields(module_file, model_name, module)
                    if folder == "filters":
                        write_filter_fields(module_file, model_name, folder_path)
