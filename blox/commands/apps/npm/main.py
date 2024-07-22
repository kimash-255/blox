import os
import subprocess
import json
import click
from ...config import PROJECT_ROOT, CUSTOM_APPS_PATH


def install_npm_libraries(libraries, app_name=None):
    """
    Install specified NPM libraries. If an app_name is provided, update its package.json.

    Args:
        libraries: List of library names to install.
        app_name: Optional name of the custom app to update its package.json.
    """
    core_nextjs_dir = os.path.join(PROJECT_ROOT, 'apps/core/nextjs')
    custom_nextjs_dir = os.path.join(
        CUSTOM_APPS_PATH, app_name) if app_name else None

    # Install in core Next.js directory
    try:
        subprocess.check_call(['npm', 'install'] +
                              list(libraries), cwd=core_nextjs_dir)
        click.echo("Libraries installed successfully in core Next.js project.")
    except subprocess.CalledProcessError as e:
        click.echo(f"Error installing libraries in core Next.js project: {e}")

    # If an app_name is provided, update package.json and install in custom path
    if app_name:
        if not os.path.exists(custom_nextjs_dir):
            click.echo(f"Custom path {custom_nextjs_dir} does not exist.")
            return

        package_json_path = os.path.join(custom_nextjs_dir, 'package.json')

        if not os.path.exists(package_json_path):
            click.echo(f"No package.json found at {package_json_path}")
            return

        # Load and update package.json
        with open(package_json_path, 'r') as f:
            package_json = json.load(f)

        if 'dependencies' not in package_json:
            package_json['dependencies'] = {}

        for library in libraries:
            package_json['dependencies'][library] = "*"

        with open(package_json_path, 'w') as f:
            json.dump(package_json, f, indent=2)

        click.echo(f"Updated {package_json_path} with new libraries")

        # Install in custom Next.js directory
        try:
            subprocess.check_call(['npm', 'install'] +
                                  list(libraries), cwd=custom_nextjs_dir)
            click.echo(
                "Libraries installed successfully in custom Next.js project.")
        except subprocess.CalledProcessError as e:
            click.echo(
                f"Error installing libraries in custom Next.js project: {e}")


@click.group()
def npm():
    """
    Manage NPM packages for the Next.js project.
    """
    pass


@click.command()
@click.argument('libraries', nargs=-1)
@click.option('--app', type=str, help='Specify a custom app to update its package.json')
def install(libraries, app):
    """
    Install the specified NPM libraries in the Next.js project.
    Usage: blox npm install <library_name> [<library_name>...] [--app <app_name>]
    """
    install_npm_libraries(libraries, app)


@click.command()
@click.argument('libraries', nargs=-1)
@click.option('--app', type=str, help='Specify a custom app to update its package.json')
def i(libraries, app):
    """
    Install the specified NPM libraries in the Next.js project using the alias 'i'.
    Usage: blox npm i <library_name> [<library_name>...] [--app <app_name>]
    """
    install_npm_libraries(libraries, app)


npm.add_command(install)
npm.add_command(i)
