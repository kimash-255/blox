import os
import subprocess
import sys
import click
from .config import PROJECT_ROOT, CUSTOM_APPS_PATH


def install_django_requirements():
    """Install Django requirements from requirements.txt."""
    django_requirements = os.path.join(
        PROJECT_ROOT, 'apps/core/django/requirements.txt')
    if os.path.exists(django_requirements):
        python_executable = get_python_executable()
        subprocess.check_call(
            [python_executable, '-m', 'pip', 'install', '-r', django_requirements])
        click.echo("Django requirements installed.")
    else:
        click.echo("No Django requirements file found.")


def install_nextjs_dependencies(directory):
    """Install Next.js dependencies from package.json."""
    package_json_path = os.path.join(directory, 'package.json')
    if os.path.exists(package_json_path):
        subprocess.check_call(['npm', 'install'], cwd=directory)
        click.echo(f"Dependencies installed for {directory}.")
    else:
        click.echo(f"No package.json found in {directory}.")


def get_python_executable():
    """Return the path to the Python executable in the virtual environment."""
    venv_path = os.path.join(PROJECT_ROOT, 'env')
    if sys.platform.startswith('win'):
        return os.path.join(venv_path, 'Scripts', 'python.exe')
    return os.path.join(venv_path, 'bin', 'python')


@click.command()
def install():
    venv_path = os.path.join(PROJECT_ROOT, 'env')
    if not os.path.exists(venv_path):
        click.echo(
            "Virtual environment not found. Please run 'blox setup' first.")
        return

    # Install Django requirements
    install_django_requirements()

    # Install Next.js dependencies in core path
    core_nextjs_dir = os.path.join(PROJECT_ROOT, 'apps/core/nextjs')
    install_nextjs_dependencies(core_nextjs_dir)

    # Install dependencies for custom apps
    if os.path.exists(CUSTOM_APPS_PATH):
        for app_name in os.listdir(CUSTOM_APPS_PATH):
            app_path = os.path.join(CUSTOM_APPS_PATH, app_name)
            if os.path.isdir(app_path):
                # Check and install dependencies for custom Django apps
                custom_django_requirements = os.path.join(
                    app_path, 'requirements.txt')
                if os.path.exists(custom_django_requirements):
                    subprocess.check_call([get_python_executable(
                    ), '-m', 'pip', 'install', '-r', custom_django_requirements])
                    click.echo(
                        f"Custom Django requirements installed for {app_name}.")

                # Check and install dependencies for custom Next.js apps
                install_nextjs_dependencies(app_path)

    click.echo("All dependencies installed.")
