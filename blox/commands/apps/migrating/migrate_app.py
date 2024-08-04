import os
import subprocess
import click
import platform
import re
import json
from ...config import PROJECT_ROOT, BASE_PATH, APPS_TXT_PATH, CUSTOM_APPS_PATH
from ...utils.write_models import write_model_fields
from ...utils.write_filters import write_filter_fields
from .update_urls import underscore_to_titlecase
from .migrate_doc import write_serializer_fields, write_viewset
from .migrate_doc import MODULES_FOLDER
from .migrate_module import migrate_module, add_init_files


def update_apps_txt(app_name, remove=False):
    """Update apps.txt by adding or removing an app."""
    with open(APPS_TXT_PATH, "r") as apps_file:
        apps = [
            app.strip()
            for app in apps_file.readlines()
            if not app.strip().startswith("#")
        ]

    if remove and app_name in apps:
        apps.remove(app_name)

    with open(APPS_TXT_PATH, "w") as apps_file:
        for app in apps:
            apps_file.write(f"{app}\n")


def migrate_app(app_name):
    """Migrate a specific app."""
    click.echo(f"Processing app '{app_name}'...")

    custom_app_path = os.path.join(CUSTOM_APPS_PATH, app_name)
    if not os.path.exists(custom_app_path):
        click.echo(f"No custom folder found for '{app_name}'. Removing from apps.txt.")
        update_apps_txt(app_name, remove=True)
        return

    modules_file_path = os.path.join(custom_app_path, "modules.txt")
    if not os.path.exists(modules_file_path):
        click.echo(f"No modules.txt found for '{app_name}'. Removing from apps.txt.")
        update_apps_txt(app_name, remove=True)
        return

    with open(modules_file_path, "r") as modules_file:
        modules = [
            module.strip()
            for module in modules_file.readlines()
            if not module.strip().startswith("#")
        ]

    for folder, module_name in MODULES_FOLDER.items():
        module_folder_path = os.path.join(BASE_PATH, app_name, folder)
        module_file_path = os.path.join(BASE_PATH, app_name, f"{folder}.py")

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

        for module in modules:
            module_file_path = os.path.join(module_folder_path, f"{module}.py")
            with open(module_file_path, "w") as module_file:
                module_file.write(f"# {module}.py\n")
                doc_folder_path = os.path.join(custom_app_path, module, "doc")
                if os.path.exists(doc_folder_path):
                    if folder == "models":
                        module_file.write(
                            f"from django.db import models\nfrom core.models import BaseModel\n\n"
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
                                write_filter_fields(
                                    module_file, model_name, folder_path
                                )
                    elif folder == "views":
                        module_file.write(
                            f"from rest_framework import viewsets\nfrom core.views.template import GenericViewSet\nfrom {app_name}.models.{module} import *\nfrom {app_name}.filters.{module} import *\nfrom {app_name}.serializers.{module} import *\n\n"
                        )
                        for folder_name in os.listdir(doc_folder_path):
                            folder_path = os.path.join(doc_folder_path, folder_name)
                            if os.path.isdir(folder_path):
                                model_name = underscore_to_titlecase(folder_name)
                                write_viewset(module_file, model_name, module)

        add_init_files(module_folder_path)

    for module in modules:
        migrate_module(app_name, module)

    click.echo(f"Processed app '{app_name}'.")
