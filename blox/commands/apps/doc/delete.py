# delete.py
import click
import subprocess

@click.command()
@click.argument('package_name')
def delete(package_name):
    """
    Delete an existing NPM package from the Next.js project.
    """
    # Replace with actual logic for deleting a package
    click.echo(f"Deleting package: {package_name}")
    click.echo(f"Package {package_name} deleted successfully.")
