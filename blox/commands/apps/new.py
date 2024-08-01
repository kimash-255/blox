import os
import subprocess
import click
from ..config import PROJECT_ROOT, BASE_PATH, APPS_TXT_PATH, CUSTOM_APPS_PATH
import platform

@click.command()
@click.argument('app_name')
def startapp(app_name):
    """Create a new Django app with the specified name."""

    # Check if the app already exists in INSTALLED_APPS
    new_installed_app = f"    '{app_name}',"
    settings_path = os.path.join(BASE_PATH, 'backend', 'settings.py')
    with open(settings_path, 'r') as settings_file:
        settings = settings_file.readlines()

    if any(new_installed_app.strip().strip(',') in line for line in settings):
        click.echo(f"The app '{app_name}' is already in INSTALLED_APPS.")
        return

    # Create the new Django app
    python_command = 'python' if platform.system() == 'Windows' else 'python3'
    django_process = subprocess.Popen(
        [python_command, 'manage.py', 'startapp', app_name],
        cwd=BASE_PATH
    )
    try:
        django_process.communicate()
    except KeyboardInterrupt:
        click.echo("Stopping blox...")
        django_process.terminate()

    # Add the new app to INSTALLED_APPS in settings.py
    installed_apps_index = None
    for i, line in enumerate(settings):
        if 'INSTALLED_APPS = [' in line:
            installed_apps_index = i
            break

    if installed_apps_index is not None:
        end_index = installed_apps_index
        while not settings[end_index].strip().endswith(']'):
            end_index += 1
        settings.insert(end_index, f'{new_installed_app}\n')

    with open(settings_path, 'w') as settings_file:
        settings_file.writelines(settings)

    # Add the new app to apps.txt
    with open(APPS_TXT_PATH, 'a') as apps_file:
        apps_file.write(f'{app_name}\n')

    # Create urls.py for the new app
    app_path = os.path.join(BASE_PATH, app_name)
    urls_path = os.path.join(app_path, 'urls.py')
    with open(urls_path, 'w') as urls_file:
        urls_file.write("from django.urls import path\n\n")
        urls_file.write("urlpatterns = [\n")
        urls_file.write("    # Define your app's URLs here\n")
        urls_file.write("]\n")

    # Add the new app's URL to project's urls.py
    main_urls_path = os.path.join(BASE_PATH, 'backend', 'urls.py')
    with open(main_urls_path, 'a') as main_urls_file:
        main_urls_file.write("urlpatterns += [\n")
        main_urls_file.write(
            f"    path('{app_name}/', include('{app_name}.urls')),\n")
        main_urls_file.write("]\n")

    # Create the custom app folder and required files
    custom_app_path = os.path.join(CUSTOM_APPS_PATH, app_name)
    os.makedirs(custom_app_path, exist_ok=True)

    # Create nested appname folder inside custom/appname/
    nested_app_path = os.path.join(custom_app_path, app_name)
    os.makedirs(nested_app_path, exist_ok=True)

    with open(os.path.join(custom_app_path, 'modules.txt'), 'w') as modules_file:
        modules_file.write(f"# List of modules for {app_name}\n")
        modules_file.write(f"{app_name}\n")
    with open(os.path.join(custom_app_path, 'requirements.txt'), 'w') as requirements_file:
        requirements_file.write("# List of requirements\n")
    with open(os.path.join(custom_app_path, 'package.json'), 'w') as package_file:
        package_file.write("{\n    \"name\": \"" + app_name +
                           "\",\n    \"version\": \"1.0.0\",\n    \"main\": \"index.js\",\n    \"scripts\": {\n        \"start\": \"\"\n    }\n}\n")

    django_process = subprocess.Popen(
        ['blox', 'migrate'],
        cwd=BASE_PATH
    )
    django_process.communicate()

    click.echo(
        f"The app '{app_name}' has been created successfully.")
