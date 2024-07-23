import os
import subprocess
import json
import click
from ...config import PROJECT_ROOT, CUSTOM_APPS_PATH
from .delete import delete
from .new import new


@click.group()
def doc():
    """
    Manage NPM packages for the Next.js project.
    """
    pass


doc.add_command(new)
doc.add_command(delete)
