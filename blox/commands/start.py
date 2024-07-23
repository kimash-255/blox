import os
import subprocess
import sys
import click
import socket
import threading
from .config import PROJECT_ROOT, write_running_ports


def find_free_port(start_port=3000):
    port = start_port
    while True:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            if sock.connect_ex(('localhost', port)) != 0:
                return port
            port += 1


def stream_reader(stream, color, prefix='', first_line_only=False):
    """Reads from a stream and prints lines with a given color and optional prefix.

    Args:
        stream: The stream to read from.
        color: The color to use for printing.
        prefix: An optional prefix to prepend to each line.
        first_line_only: If True, print the prefix only once.
    """
    first_line = True
    for line in iter(stream.readline, ''):
        if line:
            line = line.strip()
            if first_line_only:
                if first_line:
                    click.echo(click.style(prefix, fg='red'), nl=False)
                    first_line = False
            if line:
                click.echo(click.style(f"{line}", fg=color))


@click.command()
def start():
    venv_path = os.path.join(PROJECT_ROOT, 'env')
    if not os.path.exists(venv_path):
        click.echo(
            "Virtual environment not found. Please run 'blox setup' first.")
        return

    python_executable = os.path.join(venv_path, 'bin', 'python3')
    if sys.platform.startswith('win'):
        python_executable = os.path.join(venv_path, 'Scripts', 'python.exe')

    django_port = find_free_port(8000)
    nextjs_port = find_free_port(3000)

    django_process = None
    nextjs_process = None

    try:
        # Start Django and Next.js processes
        django_process = subprocess.Popen(
            [python_executable, 'manage.py',
                'runserver', f'0.0.0.0:{django_port}'],
            cwd=os.path.join(PROJECT_ROOT, 'apps/core/django'),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        nextjs_process = subprocess.Popen(
            ['npm', 'run', 'dev', '--', '--port', str(nextjs_port)],
            cwd=os.path.join(PROJECT_ROOT, 'apps/core/nextjs'),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        click.echo(click.style(
            f"Running Django server on port {django_port}", fg='green'))
        click.echo(click.style(
            f"Running Next.js server on port {nextjs_port}", fg='green'))
        click.echo(click.style(
            f"Open Next.js at: http://localhost:{nextjs_port}", fg='green'))

        write_running_ports(django_port, nextjs_port)

        # Start threads to read stdout and stderr from both processes
        django_stdout_thread = threading.Thread(
            target=stream_reader, args=(django_process.stdout, 'white'))
        django_stderr_thread = threading.Thread(target=stream_reader, args=(
            django_process.stderr, 'bright_black', 'Django warning: ', True))
        nextjs_stdout_thread = threading.Thread(
            target=stream_reader, args=(nextjs_process.stdout, 'white'))
        nextjs_stderr_thread = threading.Thread(target=stream_reader, args=(
            nextjs_process.stderr, 'bright_black', 'Next.js warning: ', True))

        django_stdout_thread.start()
        django_stderr_thread.start()
        nextjs_stdout_thread.start()
        nextjs_stderr_thread.start()

        try:
            django_process.wait()
            nextjs_process.wait()
        except KeyboardInterrupt:
            click.echo("Stopping blox...")
            if django_process:
                django_process.terminate()
                try:
                    django_process.wait(timeout=5)
                except subprocess.TimeoutExpired:
                    django_process.kill()
            if nextjs_process:
                nextjs_process.terminate()
                try:
                    nextjs_process.wait(timeout=5)
                except subprocess.TimeoutExpired:
                    nextjs_process.kill()
            django_stdout_thread.join()
            django_stderr_thread.join()
            nextjs_stdout_thread.join()
            nextjs_stderr_thread.join()

    except Exception as e:
        click.echo(click.style(f"Exception: {str(e)}", fg='red'))
    finally:
        if django_process and django_process.poll() is None:
            django_process.terminate()
            try:
                django_process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                django_process.kill()
        if nextjs_process and nextjs_process.poll() is None:
            nextjs_process.terminate()
            try:
                nextjs_process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                nextjs_process.kill()
