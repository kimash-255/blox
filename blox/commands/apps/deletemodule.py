import os
import subprocess
import sys
import click
from ..config import CUSTOM_APPS_PATH


def remove_module_folder(app_path, module_name):
    """Remove the module's folder inside the app's directory."""
    module_path = os.path.join(app_path, module_name)
    if os.path.isdir(module_path):
        os.rmdir(module_path)  # Use shutil.rmtree if the folder contains files
        return True
    return False


def update_modules_txt(app_path, module_name):
    """Remove the module name from the modules.txt file if it exists."""
    modules_txt_path = os.path.join(app_path, 'modules.txt')
    lines = []
    removed = False

    with open(modules_txt_path, 'r') as modules_file:
        lines = modules_file.readlines()

    with open(modules_txt_path, 'w') as modules_file:
        for line in lines:
            if line.strip() != module_name:
                modules_file.write(line)
            else:
                removed = True

    return removed


def run_migrations():
    """Run migrations."""
    subprocess.run(['blox', 'migrate'], check=True)


@click.command()
@click.argument('app_name')
@click.argument('module_name')
def deletemodule(app_name, module_name):
    """Remove a module from a Django app and update the configuration."""
    app_path = os.path.join(CUSTOM_APPS_PATH, app_name)
    if not os.path.isdir(app_path):
        click.echo(f"The app '{app_name}' does not exist.")
        sys.exit(1)

    # Remove the module folder
    if remove_module_folder(app_path, module_name):
        click.echo(f"Removed module folder '{module_name}' from app '{app_name}'.")
    else:
        click.echo(f"The module '{module_name}' does not exist.")
        sys.exit(1)

    # Update modules.txt
    if update_modules_txt(app_path, module_name):
        click.echo(f"Removed '{module_name}' from modules.txt.")
    else:
        click.echo(f"Module '{module_name}' is not listed in modules.txt.")

    # Run migrations
    click.echo("Running migrations...")
    try:
        run_migrations()
        click.echo(f"The module '{module_name}' has been removed successfully.")
    except subprocess.CalledProcessError:
        click.echo("Failed to apply migrations.")
        sys.exit(1)


if __name__ == "__main__":
    deletemodule()
