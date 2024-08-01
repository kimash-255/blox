import os
import subprocess
import click
from ..config import BASE_PATH, APPS_TXT_PATH, CUSTOM_APPS_PATH
import platform

@click.command()
@click.argument('app_name')
def deleteapp(app_name):
    """Delete the Django app with the specified name."""

    # Check if the app exists in INSTALLED_APPS
    new_installed_app = f"    '{app_name}',"
    settings_path = os.path.join(BASE_PATH, 'backend', 'settings.py')

    with open(settings_path, 'r') as settings_file:
        settings = settings_file.readlines()

    if not any(new_installed_app.strip().strip(',') in line for line in settings):
        click.echo(f"The app '{app_name}' is not in INSTALLED_APPS.")
        return

    # Remove the app from INSTALLED_APPS in settings.py
    installed_apps_index = None
    for i, line in enumerate(settings):
        if 'INSTALLED_APPS = [' in line:
            installed_apps_index = i
            break

    if installed_apps_index is not None:
        end_index = installed_apps_index
        while not settings[end_index].strip().endswith(']'):
            end_index += 1
        settings = [
            line for line in settings if line.strip() != new_installed_app.strip()
        ]

    with open(settings_path, 'w') as settings_file:
        settings_file.writelines(settings)

    # Remove the app from apps.txt
    with open(APPS_TXT_PATH, 'r') as apps_file:
        apps_lines = apps_file.readlines()

    with open(APPS_TXT_PATH, 'w') as apps_file:
        for line in apps_lines:
            if line.strip() != app_name:
                apps_file.write(line)

    # Remove the app's URL from project's urls.py
    main_urls_path = os.path.join(BASE_PATH, 'backend', 'urls.py')
    with open(main_urls_path, 'r') as main_urls_file:
        main_urls_lines = main_urls_file.readlines()

    with open(main_urls_path, 'w') as main_urls_file:
        to_remove = set()
        for i, line in enumerate(main_urls_lines):
            if f"path('{app_name}/', include('{app_name}.urls'))," in line:
                # Mark this line and one line above and below it for removal
                to_remove.update([i, i - 1, i + 1])

        for i, line in enumerate(main_urls_lines):
            if i not in to_remove:
                main_urls_file.write(line)

    # Delete the app folder
    app_path = os.path.join(BASE_PATH, app_name)
    if os.path.exists(app_path):
        subprocess.call(['rm', '-rf', app_path])

    # Delete the custom app folder and its content
    custom_app_path = os.path.join(CUSTOM_APPS_PATH, app_name)
    if os.path.exists(custom_app_path):
        subprocess.call(['rm', '-rf', custom_app_path])

    # Run makemigrations and migrate
    python_command = 'python' if platform.system() == 'Windows' else 'python3'
    django_process = subprocess.Popen(
        [python_command, 'manage.py', 'makemigrations'],
        cwd=BASE_PATH
    )
    django_process.communicate()

    django_process = subprocess.Popen(
        [python_command, 'manage.py', 'migrate'],
        cwd=BASE_PATH
    )
    django_process.communicate()

    click.echo(f"The app '{app_name}' has been deleted successfully.")
