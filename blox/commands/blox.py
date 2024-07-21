import os
import subprocess
import sys
import click
import socket
from .config import PROJECT_ROOT, write_running_ports
from .apps import *


@click.group()
def blox():
    pass


@blox.command()
def setup():
    directories = [
        'apps/core/django/core_app',
        'apps/core/django/settings',
        'apps/core/django/urls',
        'apps/core/django/wsgi',
        'apps/core/nextjs/core',
        'apps/core/nextjs/.next',
        'apps/custom/shipping',
        'config/nginx',
        'config/apache',
        'utilities/scripts',
        'utilities/utilities'
    ]

    for directory in directories:
        os.makedirs(os.path.join(PROJECT_ROOT, directory), exist_ok=True)

    initial_files = {
        'apps/core/nextjs/next.config.js': '// Next.js configuration file',
        'utilities/scripts/automate_tasks.py': '# Placeholder for automation tasks script',
        'utilities/scripts/setup_environment.py': '# Placeholder for environment setup script',
        'utilities/utilities/logging_utils.py': '# Placeholder for logging utilities',
        'utilities/utilities/security_utils.py': '# Placeholder for security utilities'
    }

    for file, content in initial_files.items():
        file_path = os.path.join(PROJECT_ROOT, file)
        if not os.path.exists(file_path):
            with open(file_path, 'w') as f:
                f.write(content)

    click.echo("Setup completed.")


@blox.command()
def install():
    django_requirements = os.path.join(
        PROJECT_ROOT, 'apps/core/django/requirements.txt')
    if os.path.exists(django_requirements):
        subprocess.check_call([sys.executable, '-m', 'pip', 'install',
                              '-r', django_requirements])
    nextjs_dir = os.path.join(PROJECT_ROOT, 'apps/core/nextjs')
    subprocess.check_call(['npm', 'install'], cwd=nextjs_dir)

    click.echo("Dependencies installed.")


def find_free_port(start_port=3000):
    port = start_port
    while True:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            if sock.connect_ex(('localhost', port)) != 0:
                return port
            port += 1


@blox.command()
def start():
    django_port = find_free_port(8000)
    nextjs_port = find_free_port(3000)

    django_process = subprocess.Popen(
        ['python3', 'manage.py', 'runserver', f'0.0.0.0:{django_port}'],
        cwd=os.path.join(PROJECT_ROOT, 'apps/core/django')
    )
    nextjs_process = subprocess.Popen(
        ['npm', 'run', 'dev', '--', '--port', str(nextjs_port)],
        cwd=os.path.join(PROJECT_ROOT, 'apps/core/nextjs')
    )

    click.echo(f"Running Django server on port {django_port}")
    click.echo(f"Running Next.js server on port {nextjs_port}")

    write_running_ports(django_port, nextjs_port)

    try:
        django_process.communicate()
        nextjs_process.communicate()
    except KeyboardInterrupt:
        click.echo("Stopping blox...")
        django_process.terminate()
        nextjs_process.terminate()


if __name__ == '__main__':
    blox()


if __name__ == '__main__':
    blox()
