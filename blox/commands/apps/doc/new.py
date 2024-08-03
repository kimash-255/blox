import os
import click
import subprocess
import sys
from ...config import CUSTOM_APPS_PATH


def create_folder_structure(app_path, module_name, doc_name):
    """Create the folder structure and necessary files inside the module directory."""
    module_path = os.path.join(app_path, module_name, "doc", doc_name)
    if not os.path.isdir(module_path):
        os.makedirs(module_path)

        # Define file names and their default content
        files = {
            f"fields.js": """// Description: List all document fields including types, config, etc. for Next.js.\n\n""",
            f"fields.json": """[]\n\n""",
            f"list.js": """// Description: Override document list in Next.js.\n\n""",
            f"detail.js": """// Description: View document details in Next.js.\n\n""",
            f"document.py": """# Description: Backend code for handling data operations.\n\n""",
        }

        for file_name, content in files.items():
            file_path = os.path.join(module_path, file_name)
            with open(file_path, "w") as file:
                file.write(content)

        return True
    return False


def run_migrations():
    """Run migrations."""
    subprocess.run(["blox", "migrate"], check=True)


@click.command()
@click.option("--app", required=True, help="The name of the Django app.")
@click.option("--module", required=True, help="The name of the module within the app.")
@click.argument("doc_name")
def new(app, module, doc_name):
    """Create a new folder structure for a Django module, add files with descriptions, and update configuration."""
    app_path = os.path.join(CUSTOM_APPS_PATH, app)
    if not os.path.isdir(app_path):
        click.echo(f"The app '{app}' does not exist.")
        sys.exit(1)

    # Create the folder structure and files
    if create_folder_structure(app_path, module, doc_name):
        click.echo(
            f"Created document '{doc_name}' for module '{module}' in app '{app}'."
        )
    else:
        click.echo(f"The document '{doc_name}' already exists.")
        sys.exit(1)

    # Run migrations
    click.echo("Running migrations...")
    try:
        run_migrations()
        click.echo(f"The document '{doc_name}' has been created successfully.")
    except subprocess.CalledProcessError:
        click.echo("Failed to apply migrations.")
        sys.exit(1)


if __name__ == "__main__":
    new()
