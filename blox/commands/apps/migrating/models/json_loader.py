import json
import click


def load_json_file(file_path):
    """Load JSON data from a file."""
    try:
        with open(file_path, "r") as file:
            return json.load(file)
    except (json.JSONDecodeError, AttributeError, FileNotFoundError) as e:
        click.echo(f"Error reading {file_path}: {e}")
        return None
