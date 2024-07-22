import os
import subprocess
import click
import sys
from ...config import PROJECT_ROOT, CUSTOM_APPS_PATH


def install_libraries(libraries, app_name=None):
    venv_path = os.path.join(PROJECT_ROOT, 'env')
    if not os.path.exists(venv_path):
        click.echo(
            "Virtual environment not found. Please run 'blox setup' first.")
        return

    python_executable = os.path.join(venv_path, 'bin', 'python')
    if sys.platform.startswith('win'):
        python_executable = os.path.join(venv_path, 'Scripts', 'python.exe')

    requirements_file = os.path.join(
        CUSTOM_APPS_PATH, 'requirements.txt')
    if app_name:
        requirements_file = os.path.join(
            CUSTOM_APPS_PATH, f'{app_name}/requirements.txt')

    # Add libraries to requirements file if app_name is provided
    if app_name:
        with open(requirements_file, 'a') as f:
            for library in libraries:
                f.write(f"{library}\n")
        click.echo(f"Added libraries to {requirements_file}")

    # Install libraries
    for library in libraries:
        subprocess.check_call(
            [python_executable, '-m', 'pip', 'install', library])


@click.group()
def pip():
    """
    Manage Python packages for the project.
    """
    pass


@click.command()
@click.argument('libraries', nargs=-1)
@click.option('--app', type=str, help='Specify a custom app to update its requirements.txt')
def install(libraries, app):
    """
    Install the specified Python libraries in the project.
    Usage: blox pip install <library_name> [<library_name>...] [--app <app_name>]
    """
    try:
        install_libraries(libraries, app)
        click.echo("Libraries installed successfully.")
    except subprocess.CalledProcessError as e:
        click.echo(f"Error installing libraries: {e}")


@click.command()
@click.argument('libraries', nargs=-1)
@click.option('--app', type=str, help='Specify a custom app to update its requirements.txt')
def i(libraries, app):
    """
    Install the specified Python libraries in the project using the alias 'i'.
    Usage: blox pip i <library_name> [<library_name>...] [--app <app_name>]
    """
    install_libraries(libraries, app)


pip.add_command(install)
pip.add_command(i)
