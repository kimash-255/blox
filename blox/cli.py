import click
from .commands.blox import migrate
from .commands.blox import start
from .commands.blox import setup
from .commands.blox import install
from .commands.blox import startapp


@click.group()
def cli():
    pass


cli.add_command(migrate)
cli.add_command(start)
cli.add_command(setup)
cli.add_command(install)
cli.add_command(startapp)

if __name__ == '__main__':
    cli()
