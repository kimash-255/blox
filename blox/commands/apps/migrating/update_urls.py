import os
import re
from ...config import BASE_PATH, CUSTOM_APPS_PATH


def underscore_to_titlecase(underscore_str):
    """Convert underscore string to title case."""
    return re.sub(r"_(.)", lambda m: m.group(1).upper(), underscore_str.title())


def write_urls(url_file, model_name, module_name):
    """Write URLs for a given model."""
    url_file.write(f"router.register(r'{module_name}', {model_name}ViewSet)\n")


def update_urls(app_name, module):
    """Update the main urls.py file with new routes."""
    url_file_path = os.path.join(BASE_PATH, app_name, "urls.py")
    header_lines = (
        f"from django.urls import path, include\n"
        f"from rest_framework.routers import DefaultRouter\n"
        f"from {app_name}.views import *\n\n"
        f"router = DefaultRouter()\n\n"
    )
    urlpatterns_line = "urlpatterns = [path('', include(router.urls)),]\n"

    custom_app_path = os.path.join(CUSTOM_APPS_PATH, app_name)
    doc_folder_path = os.path.join(custom_app_path, module, "doc")

    existing_lines = []
    if os.path.exists(url_file_path):
        with open(url_file_path, "r") as url_file:
            existing_lines = url_file.readlines()

    with open(url_file_path, "w") as url_file:
        url_file.write(header_lines)

        for line in existing_lines:
            if (
                line.strip()
                and line not in header_lines
                and line.strip() != urlpatterns_line.strip()
            ):
                url_file.write(line)

        for folder_name in os.listdir(doc_folder_path):
            folder_path = os.path.join(doc_folder_path, folder_name)
            if os.path.isdir(folder_path):
                model_name = underscore_to_titlecase(folder_name)
                line_to_add = (
                    f"router.register(r'{folder_name}', {model_name}ViewSet)\n"
                )
                if line_to_add not in existing_lines:
                    write_urls(url_file, model_name, folder_name)

        url_file.write("\n" + urlpatterns_line)
