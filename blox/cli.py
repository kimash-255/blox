import click
from .commands.blox import *


@click.group()
def cli():
    pass


cli.add_command(migrate)
cli.add_command(start)
cli.add_command(setup)
cli.add_command(install)
cli.add_command(startapp)
cli.add_command(deleteapp)
cli.add_command(addmodule)
cli.add_command(deletemodule)
cli.add_command(npm)
cli.add_command(pip)

if __name__ == '__main__':
    cli()
