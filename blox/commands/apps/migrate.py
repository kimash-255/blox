import os
import subprocess
import click
import platform
import re
from ..config import PROJECT_ROOT, APPS_TXT_PATH
from .migrating.migrate_app import migrate_app
from .migrating.migrate_doc import migrate_doc
from .migrating.migrate_module import migrate_module

MODULES_FOLDER = {
    "views": "views",
    "models": "models",
    "filters": "filters",
    "serializers": "serializers",
}


def remove_class_block(file_path, class_name):
    """Remove the class block for a given class name from the file."""
    with open(file_path, "r") as file:
        content = file.read()

    pattern = re.compile(rf"class {class_name}\s*\(.*?\):.*?(?=\nclass |$)", re.DOTALL)
    content = pattern.sub("", content)

    with open(file_path, "w") as file:
        file.write(content)


@click.command()
@click.option("--app", default=None, help="Specify an app to migrate.")
@click.option(
    "--module", default=None, help="Specify a module to migrate. Requires --app."
)
@click.option(
    "--doc",
    default=None,
    help="Specify a folder_name to migrate. Requires --app and --module.",
)
def migrate(app, module, doc):
    """Migrate command to process apps and run Django migrations."""
    if doc and module and app:
        migrate_doc(app, module, doc)
    elif module and app:
        migrate_module(app, module)
    elif app:
        migrate_app(app)
    else:
        with open(APPS_TXT_PATH, "r") as apps_file:
            valid_apps = [
                app.strip()
                for app in apps_file.readlines()
                if not app.strip().startswith("#")
            ]
        for app_name in valid_apps:
            migrate_app(app_name)

    run_django_migrations()


def run_django_migrations():
    """Run Django makemigrations and migrate commands."""
    python_command = "python" if platform.system() == "Windows" else "python3"

    subprocess.run(
        f'echo "y" | {python_command} manage.py makemigrations',
        shell=True,
        cwd=os.path.join(PROJECT_ROOT, "apps/core/django"),
    )

    subprocess.run(
        [python_command, "manage.py", "migrate", "--noinput"],
        cwd=os.path.join(PROJECT_ROOT, "apps/core/django"),
    )

    click.echo("Migration completed.")


if __name__ == "__main__":
    migrate()
