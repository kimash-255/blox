import os
import subprocess
import sys
import click
from .config import PROJECT_ROOT


@click.command()
def setup():
    venv_path = os.path.join(PROJECT_ROOT, 'env')
    if not os.path.exists(venv_path):
        subprocess.check_call([sys.executable, '-m', 'venv', venv_path])
        click.echo("Virtual environment created.")
    click.echo("Setup completed.")
    subprocess.check_call(['blox', 'install'])
