import os
import click
from ...config import BASE_PATH, CUSTOM_APPS_PATH
from .write_models import write_model_fields
from .write_filters import write_filter_fields
from .update_urls import underscore_to_titlecase, update_urls
from .migrate_doc import write_serializer_fields, write_viewset
from .migrate_doc import MODULES_FOLDER


def add_init_files(folder_path):
    """Create __init__.py file importing all modules in the folder."""
    init_file_path = os.path.join(folder_path, "__init__.py")
    with open(init_file_path, "w") as init_file:
        files = [
            f[:-3]
            for f in os.listdir(folder_path)
            if f.endswith(".py") and f != "__init__.py"
        ]
        for file in files:
            init_file.write(f"from .{file} import *\n")


def migrate_module(app_name, module):
    """Migrate a specific module within an app."""
    click.echo(f"Processing module '{module}' in app '{app_name}'...")

    for folder, module_name in MODULES_FOLDER.items():
        module_folder_path = os.path.join(BASE_PATH, app_name, folder)
        module_file_path = os.path.join(BASE_PATH, app_name, f"{folder}.py")
        custom_app_path = os.path.join(CUSTOM_APPS_PATH, app_name)
        if os.path.exists(module_file_path):
            os.remove(module_file_path)

        if os.path.exists(module_folder_path):
            for filename in os.listdir(module_folder_path):
                file_path = os.path.join(module_folder_path, filename)
                if os.path.isfile(file_path) and not filename.startswith("__init__.py"):
                    os.remove(file_path)

            if not os.listdir(module_folder_path):
                os.rmdir(module_folder_path)
        else:
            os.makedirs(module_folder_path, exist_ok=True)

        module_file_path = os.path.join(module_folder_path, f"{module}.py")
        with open(module_file_path, "w") as module_file:
            doc_folder_path = os.path.join(custom_app_path, module, "doc")
            if os.path.exists(doc_folder_path):
                if folder == "models":
                    module_file.write(
                        f"from django.db import models\nfrom core.models import BaseModel\nimport uuid\n\n"
                    )
                    for folder_name in os.listdir(doc_folder_path):
                        folder_path = os.path.join(doc_folder_path, folder_name)
                        if os.path.isdir(folder_path):
                            model_name = underscore_to_titlecase(folder_name)
                            module_file.write(f"class {model_name}(BaseModel):\n")
                            write_model_fields(
                                module_file, module_file_path, folder_path
                            )

                elif folder == "serializers":
                    module_file.write(
                        f"from rest_framework import serializers\nfrom {app_name}.models.{module} import *\n\n"
                    )
                    for folder_name in os.listdir(doc_folder_path):
                        folder_path = os.path.join(doc_folder_path, folder_name)
                        if os.path.isdir(folder_path):
                            model_name = underscore_to_titlecase(folder_name)
                            write_serializer_fields(module_file, model_name, [])
                elif folder == "filters":
                    module_file.write(
                        f"import django_filters as filters\nfrom {app_name}.models.{module} import *\n\n"
                    )
                    for folder_name in os.listdir(doc_folder_path):
                        folder_path = os.path.join(doc_folder_path, folder_name)
                        if os.path.isdir(folder_path):
                            model_name = underscore_to_titlecase(folder_name)
                            write_filter_fields(module_file, model_name, folder_path)
                elif folder == "views":
                    module_file.write(
                        f"from rest_framework import viewsets\nfrom core.views.template import GenericViewSet\nfrom {app_name}.models.{module} import *\nfrom {app_name}.filters.{module} import *\nfrom {app_name}.serializers.{module} import *\n\n"
                    )
                    for folder_name in os.listdir(doc_folder_path):
                        folder_path = os.path.join(doc_folder_path, folder_name)
                        if os.path.isdir(folder_path):
                            model_name = underscore_to_titlecase(folder_name)
                            write_viewset(module_file, model_name, module)

        update_urls(app_name, module)
        add_init_files(module_folder_path)

    click.echo(f"Processed module '{module}' in app '{app_name}'.")
