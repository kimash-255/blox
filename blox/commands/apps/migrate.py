import os
import subprocess
import click
import platform
import re
import json
from ..config import PROJECT_ROOT, BASE_PATH, APPS_TXT_PATH, CUSTOM_APPS_PATH

MODULES_FOLDER = {
    'views': 'views',
    'models': 'models',
    'filters': 'filters',
    'serializers': 'serializers'
}


def remove_class_block(file_path, class_name):
    """Remove the class block for a given class name from the file."""
    with open(file_path, 'r') as file:
        content = file.read()

    # Regex to find class blocks
    pattern = re.compile(rf'class {class_name}\s*\(.*?\):.*?(?=\nclass |$)', re.DOTALL)
    content = pattern.sub('', content)

    with open(file_path, 'w') as file:
        file.write(content)

def add_init_files(folder_path):
    """Create __init__.py file importing all modules in the folder."""
    init_file_path = os.path.join(folder_path, '__init__.py')
    with open(init_file_path, 'w') as init_file:
        files = [f[:-3] for f in os.listdir(folder_path) if f.endswith('.py') and f != '__init__.py']
        for file in files:
            init_file.write(f"from .{file} import *\n")

def update_apps_txt(app_name, remove=False):
    """Update apps.txt by adding or removing an app."""
    with open(APPS_TXT_PATH, 'r') as apps_file:
        apps = [app.strip() for app in apps_file.readlines() if not app.strip().startswith('#')]

    if remove and app_name in apps:
        apps.remove(app_name)

    with open(APPS_TXT_PATH, 'w') as apps_file:
        for app in apps:
            apps_file.write(f"{app}\n")

def underscore_to_titlecase(underscore_str):
    """Convert underscore string to title case."""
    return re.sub(r'_(.)', lambda m: m.group(1).upper(), underscore_str.title())

def write_model_fields(module_file, model_file, folder_path):
    """Write model fields based on fields.json in the given folder path."""
    fields_file_path = os.path.join(folder_path, 'fields.json')
    if not os.path.exists(fields_file_path):
        module_file.write(f"    pass\n\n")
        return

    with open(fields_file_path, 'r') as fields_file:
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


    for field in field_list:
        FIELD_TYPE_MAP = {
            "TextField": {"type": "models.TextField"},
            "CharField": {"type": "models.CharField", "max_length": 255},
            "NumberField": {"type": "models.IntegerField"},
            "FloatField": {"type": "models.FloatField"},
            "DecimalField": {"type": "models.DecimalField", "max_digits": 10, "decimal_places": 2},
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
            "ForeignKey": {"type": "models.ForeignKey", "to": "'self'", "on_delete": "models.CASCADE"},
            "OneToOneField": {"type": "models.OneToOneField", "to": "'self'", "on_delete": "models.CASCADE"},
            "ManyToManyField": {"type": "models.ManyToManyField", "to": "'self'"}
        }
        field_id = field.get("id", "")
        field_name = field.get("name", "")
        type = field["type"]
        field_type_info = FIELD_TYPE_MAP[type]
        module_file.write(f"    {field_id} = {field_type_info['type']}(verbose_name='{field_name}', null=True, blank=True")
        field_type_info.pop("type", None)
        field_params = ", ".join([f"{key}={value}" for key, value in field_type_info.items()])
        if field_params:
            module_file.write(f", {field_params}")
        module_file.write(")\n")

    module_file.write(f"\n\n")


def write_serializer_fields(serializer_file, model_name, fields):
    """Write serializer fields for a given model."""
    serializer_file.write(f"class {model_name}Serializer(serializers.ModelSerializer):\n")
    serializer_file.write(f"    class Meta:\n")
    serializer_file.write(f"        model = {model_name}\n")
    serializer_file.write(f"        fields = '__all__'\n\n")

def write_filter_fields(filter_file, model_name, fields):
    """Write filter fields for a given model."""
    filter_file.write(f"class {model_name}Filter(filters.FilterSet):\n")
    filter_file.write(f"    class Meta:\n")
    filter_file.write(f"        model = {model_name}\n")
    filter_file.write(f"        fields = '__all__'\n\n")

def write_viewset(view_file, model_name, module_name):
    """Write viewset for a given model."""
    view_file.write(f"class {model_name}ViewSet(GenericViewSet):\n")
    view_file.write(f"    queryset = {model_name}.objects.all()\n")
    view_file.write(f"    filterset_class = {model_name}Filter\n")
    view_file.write(f"    serializer_class = {model_name}Serializer\n\n")

@click.command()
@click.option('--app', default=None, help='Specify an app to migrate.')
@click.option('--module', default=None, help='Specify a module to migrate. Requires --app.')
@click.option('--doc', default=None, help='Specify a folder_name to migrate. Requires --app and --module.')
def migrate(app, module, doc):
    """Migrate command to process apps and run Django migrations."""
    if doc and module and app:
        migrate_doc(app, module, doc)
    elif module and app:
        migrate_module(app, module)
    elif app:
        migrate_app(app)
    else:
        with open(APPS_TXT_PATH, 'r') as apps_file:
            valid_apps = [app.strip() for app in apps_file.readlines() if not app.strip().startswith('#')]
        for app_name in valid_apps:
            migrate_app(app_name)

    run_django_migrations()

def migrate_app(app_name):
    """Migrate a specific app."""
    click.echo(f"Processing app '{app_name}'...")

    custom_app_path = os.path.join(CUSTOM_APPS_PATH, app_name)
    if not os.path.exists(custom_app_path):
        click.echo(f"No custom folder found for '{app_name}'. Removing from apps.txt.")
        update_apps_txt(app_name, remove=True)
        return

    modules_file_path = os.path.join(custom_app_path, 'modules.txt')
    if not os.path.exists(modules_file_path):
        click.echo(f"No modules.txt found for '{app_name}'. Removing from apps.txt.")
        update_apps_txt(app_name, remove=True)
        return

    with open(modules_file_path, 'r') as modules_file:
        modules = [module.strip() for module in modules_file.readlines() if not module.strip().startswith('#')]

    for folder, module_name in MODULES_FOLDER.items():
        module_folder_path = os.path.join(BASE_PATH, app_name, folder)
        module_file_path = os.path.join(BASE_PATH, app_name, f'{folder}.py')

        if os.path.exists(module_file_path):
            os.remove(module_file_path)

        if os.path.exists(module_folder_path):
            for filename in os.listdir(module_folder_path):
                file_path = os.path.join(module_folder_path, filename)
                if os.path.isfile(file_path) and not filename.startswith('__init__.py'):
                    os.remove(file_path)

            if not os.listdir(module_folder_path):
                os.rmdir(module_folder_path)
        else:
            os.makedirs(module_folder_path, exist_ok=True)

        for module in modules:
            module_file_path = os.path.join(module_folder_path, f"{module}.py")
            with open(module_file_path, 'w') as module_file:
                module_file.write(f"# {module}.py\n")
                doc_folder_path = os.path.join(custom_app_path, module, 'doc')
                if os.path.exists(doc_folder_path):
                    if folder == "models":
                        module_file.write(f"from django.db import models\nfrom core.models import BaseModel\n\n")
                        for folder_name in os.listdir(doc_folder_path):
                            folder_path = os.path.join(doc_folder_path, folder_name)
                            if os.path.isdir(folder_path):
                                model_name = underscore_to_titlecase(folder_name)
                                module_file.write(f"class {model_name}(BaseModel):\n")
                                write_model_fields(module_file, module_file_path, folder_path)
                                    
                    elif folder == "serializers":
                        module_file.write(f"from rest_framework import serializers\nfrom {app_name}.models.{module} import *\n\n")
                        for folder_name in os.listdir(doc_folder_path):
                            folder_path = os.path.join(doc_folder_path, folder_name)
                            if os.path.isdir(folder_path):
                                model_name = underscore_to_titlecase(folder_name)
                                write_serializer_fields(module_file, model_name, [])
                    elif folder == "filters":
                        module_file.write(f"import django_filters as filters\nfrom {app_name}.models.{module} import *\n\n")
                        for folder_name in os.listdir(doc_folder_path):
                            folder_path = os.path.join(doc_folder_path, folder_name)
                            if os.path.isdir(folder_path):
                                model_name = underscore_to_titlecase(folder_name)
                                write_filter_fields(module_file, model_name, [])
                    elif folder == "views":
                        module_file.write(f"from rest_framework import viewsets\nfrom core.views.template import GenericViewSet\nfrom {app_name}.models.{module} import *\nfrom {app_name}.filters.{module} import *\nfrom {app_name}.serializers.{module} import *\n\n")
                        for folder_name in os.listdir(doc_folder_path):
                            folder_path = os.path.join(doc_folder_path, folder_name)
                            if os.path.isdir(folder_path):
                                model_name = underscore_to_titlecase(folder_name)
                                write_viewset(module_file, model_name, module)
                        
        add_init_files(module_folder_path)

    for module in modules:
        migrate_module(app_name, module)

    click.echo(f"Processed app '{app_name}'.")

def migrate_module(app_name, module):
    """Migrate a specific module within an app."""
    click.echo(f"Processing module '{module}' in app '{app_name}'...")

    for folder, module_name in MODULES_FOLDER.items():
        module_folder_path = os.path.join(BASE_PATH, app_name, folder)
        module_file_path = os.path.join(BASE_PATH, app_name, f'{folder}.py')
        custom_app_path = os.path.join(CUSTOM_APPS_PATH, app_name)
        if os.path.exists(module_file_path):
            os.remove(module_file_path)

        if os.path.exists(module_folder_path):
            for filename in os.listdir(module_folder_path):
                file_path = os.path.join(module_folder_path, filename)
                if os.path.isfile(file_path) and not filename.startswith('__init__.py'):
                    os.remove(file_path)

            if not os.listdir(module_folder_path):
                os.rmdir(module_folder_path)
        else:
            os.makedirs(module_folder_path, exist_ok=True)

        module_file_path = os.path.join(module_folder_path, f"{module}.py")
        with open(module_file_path, 'w') as module_file:
            module_file.write(f"# {module}.py\n")
            doc_folder_path = os.path.join(custom_app_path, module, 'doc')
            if os.path.exists(doc_folder_path):
                if folder == "models":
                    module_file.write(f"from django.db import models\nfrom core.models import BaseModel\n\n")
                    for folder_name in os.listdir(doc_folder_path):
                        folder_path = os.path.join(doc_folder_path, folder_name)
                        if os.path.isdir(folder_path):
                            model_name = underscore_to_titlecase(folder_name)
                            module_file.write(f"class {model_name}(BaseModel):\n")
                            write_model_fields(module_file, module_file_path, folder_path)
                                
                elif folder == "serializers":
                    module_file.write(f"from rest_framework import serializers\nfrom {app_name}.models.{module} import *\n\n")
                    for folder_name in os.listdir(doc_folder_path):
                        folder_path = os.path.join(doc_folder_path, folder_name)
                        if os.path.isdir(folder_path):
                            model_name = underscore_to_titlecase(folder_name)
                            write_serializer_fields(module_file, model_name, [])
                elif folder == "filters":
                    module_file.write(f"import django_filters as filters\nfrom {app_name}.models.{module} import *\n\n")
                    for folder_name in os.listdir(doc_folder_path):
                        folder_path = os.path.join(doc_folder_path, folder_name)
                        if os.path.isdir(folder_path):
                            model_name = underscore_to_titlecase(folder_name)
                            write_filter_fields(module_file, model_name, [])
                elif folder == "views":
                    module_file.write(f"from rest_framework import viewsets\nfrom core.views.template import GenericViewSet\nfrom {app_name}.models.{module} import *\nfrom {app_name}.filters.{module} import *\nfrom {app_name}.serializers.{module} import *\n\n")
                    for folder_name in os.listdir(doc_folder_path):
                        folder_path = os.path.join(doc_folder_path, folder_name)
                        if os.path.isdir(folder_path):
                            model_name = underscore_to_titlecase(folder_name)
                            write_viewset(module_file, model_name, module)
                    

        add_init_files(module_folder_path)

    click.echo(f"Processed module '{module}' in app '{app_name}'.")

def migrate_doc(app_name, module, doc):
    """Migrate a specific document within a module and app."""
    click.echo(f"Processing '{doc}' in module '{module}' for app '{app_name}'...")

    for folder, module_name in MODULES_FOLDER.items():
        module_folder_path = os.path.join(BASE_PATH, app_name, folder)
        module_file_path = os.path.join(BASE_PATH, app_name, f'{folder}.py')
        custom_app_path = os.path.join(CUSTOM_APPS_PATH, app_name)

        # module_file_path = os.path.join(module_folder_path, f"{module}.py")
        with open(module_file_path, 'w') as module_file:
            doc_folder_path = os.path.join(custom_app_path, module, 'doc')
            if os.path.exists(doc_folder_path):
                if folder == "models":
                    folder_path = os.path.join(doc_folder_path, doc)
                    if os.path.isdir(folder_path):
                        model_name = underscore_to_titlecase(doc)
                        remove_class_block(module_file_path, "BaseModel")
                        # module_file.write(f"class {model_name}(BaseModel):\n")
                        # write_model_fields(module_file, module_file_path, folder_path)
                            
                elif folder == "serializers":
                    folder_path = os.path.join(doc_folder_path, doc)
                    if os.path.isdir(folder_path):
                            model_name = underscore_to_titlecase(doc)
                            write_serializer_fields(module_file, model_name, [])
                elif folder == "filters":
                    folder_path = os.path.join(doc_folder_path, doc)
                    if os.path.isdir(folder_path):
                            model_name = underscore_to_titlecase(doc)
                            write_filter_fields(module_file, model_name, [])
                elif folder == "views":
                    folder_path = os.path.join(doc_folder_path, doc)
                    if os.path.isdir(folder_path):
                            model_name = underscore_to_titlecase(doc)
                            write_viewset(module_file, model_name, module)
                    

def run_django_migrations():
    """Run Django makemigrations and migrate commands."""
    python_command = 'python' if platform.system() == 'Windows' else 'python3'
    subprocess.run([python_command, 'manage.py', 'makemigrations'], cwd=os.path.join(PROJECT_ROOT, 'apps/core/django'))
    subprocess.run([python_command, 'manage.py', 'migrate'], cwd=os.path.join(PROJECT_ROOT, 'apps/core/django'))
    click.echo("Migration completed.")

if __name__ == '__main__':
    migrate()
