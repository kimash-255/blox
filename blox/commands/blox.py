import click
from .setup import setup
from .install import install
from .start import start
from .apps import *


@click.group()
def blox():
    pass


blox.add_command(setup)
blox.add_command(install)
blox.add_command(start)

if __name__ == '__main__':
    blox()
