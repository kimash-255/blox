import os
import subprocess
import sys
import click
from ..config import CUSTOM_APPS_PATH


def create_module_folder(app_path, module_name):
    """Create a new folder for the module inside the app's directory."""
    module_path = os.path.join(app_path, module_name)
    if not os.path.isdir(module_path):
        os.makedirs(module_path)
        return True
    return False


def update_modules_txt(app_path, module_name):
    """Add the module name to the modules.txt file if it doesn't already exist."""
    modules_txt_path = os.path.join(app_path, 'modules.txt')
    added = False
    with open(modules_txt_path, 'a+') as modules_file:
        modules_file.seek(0)
        if f"{module_name}\n" not in modules_file.readlines():
            modules_file.write(f"{module_name}\n")
            added = True
    return added


def run_migrations():
    """Run migrations."""
    subprocess.run(['blox', 'migrate'], check=True)


@click.command()
@click.argument('app_name')
@click.argument('module_name')
def addmodule(app_name, module_name):
    """Create a new module for a Django app and update the configuration."""
    app_path = os.path.join(CUSTOM_APPS_PATH, app_name)
    if not os.path.isdir(app_path):
        click.echo(f"The app '{app_name}' does not exist.")
        sys.exit(1)

    # Create the module folder
    if create_module_folder(app_path, module_name):
        click.echo(f"Created module folder '{module_name}' in app '{app_name}'.")
    else:
        click.echo(f"The module '{module_name}' already exists.")
        sys.exit(1)

    # Update modules.txt
    if update_modules_txt(app_path, module_name):
        click.echo(f"Added '{module_name}' to modules.txt.")
    else:
        click.echo(f"Module '{module_name}' is already listed in modules.txt.")

    # Run migrations
    click.echo("Running migrations...")
    try:
        run_migrations()
        click.echo(f"The module '{module_name}' has been added successfully.")
    except subprocess.CalledProcessError:
        click.echo("Failed to apply migrations.")
        sys.exit(1)


if __name__ == "__main__":
    addmodule()
