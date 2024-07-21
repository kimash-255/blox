import os
import subprocess
import click
from ..config import PROJECT_ROOT, BASE_PATH, APPS_TXT_PATH, CUSTOM_APPS_PATH

MODULES_FOLDER = {
    'views': 'views',
    'models': 'models',
    'filters': 'filters',
    'serializers': 'serializers'
}


def add_init_files(folder_path):
    # Add __init__.py file importing all modules in the folder
    init_file_path = os.path.join(folder_path, '__init__.py')
    with open(init_file_path, 'w') as init_file:
        files = [f[:-3]
                 for f in os.listdir(folder_path) if f.endswith('.py') and f != '__init__.py']
        for file in files:
            init_file.write(f"from .{file} import *\n")


@click.command()
def migrate():
    # Read apps.txt to get the list of apps
    with open(APPS_TXT_PATH, 'r') as apps_file:
        apps = [app.strip() for app in apps_file.readlines()
                if not app.strip().startswith('#')]

    for app_name in apps:
        click.echo(f"Processing app '{app_name}'...")

        # Check if there's a corresponding folder in CUSTOM_APPS_PATH
        custom_app_path = os.path.join(CUSTOM_APPS_PATH, app_name)
        if not os.path.exists(custom_app_path):
            click.echo(f"No custom folder found for '{app_name}'. Skipping.")
            continue

        # Check modules.txt for modules associated with the app
        modules_file_path = os.path.join(custom_app_path, 'modules.txt')
        if not os.path.exists(modules_file_path):
            click.echo(f"No modules.txt found for '{app_name}'. Skipping.")
            continue

        # Read modules from modules.txt
        with open(modules_file_path, 'r') as modules_file:
            modules = [module.strip() for module in modules_file.readlines()
                       if not module.strip().startswith('#')]

        # Delete existing files and create new folders/files for each module
        for folder, module_name in MODULES_FOLDER.items():
            module_folder_path = os.path.join(BASE_PATH, app_name, folder)
            module_file_path = os.path.join(
                BASE_PATH, app_name, f'{folder}.py')
            if os.path.exists(module_file_path):
                os.remove(module_file_path)
            if os.path.exists(module_folder_path):
                # Delete existing files in the folder
                for filename in os.listdir(module_folder_path):
                    file_path = os.path.join(module_folder_path, filename)
                    if os.path.isfile(file_path) and not filename.startswith('__init__.py'):
                        os.remove(file_path)
            else:
                os.makedirs(module_folder_path, exist_ok=True)

            # Create new files for each module
            for module in modules:
                module_file_path = os.path.join(
                    module_folder_path, f"{module}.py")
                with open(module_file_path, 'w') as module_file:
                    module_file.write(f"# {module}.py\n")

            # Add __init__.py file importing all modules in the folder
            add_init_files(module_folder_path)

        click.echo(f"Processed app '{app_name}'.")

    # Run makemigrations and migrate
    django_process = subprocess.Popen(
        ['python3', 'manage.py', 'makemigrations'],
        cwd=os.path.join(PROJECT_ROOT, 'apps/core/django')
    )
    django_process.communicate()

    django_process = subprocess.Popen(
        ['python3', 'manage.py', 'migrate'],
        cwd=os.path.join(PROJECT_ROOT, 'apps/core/django')
    )
    django_process.communicate()

    click.echo("Migration completed.")


if __name__ == '__main__':
    migrate()
