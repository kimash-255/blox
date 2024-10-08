import os
import shutil
import click
import subprocess
import sys
from ...config import CUSTOM_APPS_PATH, NEXTJS_PATH


def delete_folder_structure(app_path, module_name, doc_name, app):
    """Delete the folder structure and files inside the module directory."""
    module_path = os.path.join(app_path, module_name, "doc", doc_name)

    # Delete the custom app folder and its content
    docspath = os.path.join(NEXTJS_PATH, "src", "pages", "documents", doc_name)
    if os.path.exists(docspath):
        subprocess.call(["rm", "-rf", docspath])

    # Delete the custom app folder and its content
    docspathb = os.path.join(NEXTJS_PATH, "src", "pages", app, doc_name)
    if os.path.exists(docspathb):
        subprocess.call(["rm", "-rf", docspathb])
    # Delete the custom app folder and its content
    docspathc = os.path.join(app_path, module_name, "doc", doc_name)
    if os.path.exists(docspathc):
        subprocess.call(["rm", "-rf", docspathc])
    if os.path.isdir(module_path):
        shutil.rmtree(module_path)
        return True
    return False


@click.command()
@click.option("--app", required=True, help="The name of the Django app.")
@click.option("--module", required=True, help="The name of the module within the app.")
@click.argument("doc_name")
def delete(app, module, doc_name):
    """Delete the folder structure for a Django module and update configuration."""
    app_path = os.path.join(CUSTOM_APPS_PATH, app)
    if not os.path.isdir(app_path):
        click.echo(f"The app '{app}' does not exist.")
        sys.exit(1)

    # Delete the folder structure and files
    if delete_folder_structure(app_path, module, doc_name, app):
        click.echo(
            f"Deleted document '{doc_name}' from module '{module}' in app '{app}'."
        )
    else:
        click.echo(f"The document '{doc_name}' does not exist.")
        sys.exit(1)


if __name__ == "__main__":
    delete()
