# Blox CLI

Blox CLI is a command-line interface tool designed to streamline development tasks for projects using the Blox framework, which integrates seamlessly with Django and Next.js.

## Installation

### Prerequisites

Before installing Blox CLI, ensure you have the following installed on your system:

- **Python**: Blox CLI requires Python 3.x. If you don't have Python installed, download and install it from [python.org](https://www.python.org/downloads/).
- **Pip**: Pip is the package installer for Python. It should be installed automatically when you install Python.
- **Node.js**: Blox CLI requires Node.js version 20. If you don't have Node.js installed, download and install it from [nodejs.org](https://nodejs.org/).

### Setup Environment

#### 1. Clone the Repository

Clone your Blox project repository from GitHub:

```bash
git clone https://github.com/Softleek/blox.git
cd blox
```

#### 2. Create a Virtual Environment

It's a good practice to use a virtual environment to isolate your project dependencies from other Python projects.

**Using venv:**

```bash
python -m venv env
```

or

```bash
python3 -m venv env
```

Activate the virtual environment:

- **Windows:**

  ```bash
  env\Scripts\activate
  ```

- **Unix or MacOS:**

  ```bash
  source env/bin/activate
  ```

### Install Blox CLI

Install Blox CLI in editable mode using pip. This allows you to make changes to the code and have them immediately available without reinstallation:

```bash
pip install -e .
```

### Setup Your Project

After installing Blox CLI, setup your project dependencies and configurations.

#### Install Dependencies

```bash
blox install
```

#### Apply Migrations

Apply database migrations if needed:

```bash
blox migrate
```

### Start Development Server

To start the development server:

```bash
blox start
```

The server will start and typically be accessible at `http://localhost:3000`.

## Usage

Blox CLI commands start with `blox`. Here are the available commands:

### Command: blox migrate

Migrate database schema changes.

```bash
blox migrate
```

### Command: blox start

Start the development server.

```bash
blox start
```

### Command: blox install

Install dependencies or packages.

```bash
blox install
```

### Command: blox startapp

Create and start a new application.

```bash
blox startapp [options]
```

Example:

```bash
blox startapp myapp
```

## Development

To contribute to Blox CLI development, follow these steps:

1. Clone the repository: `git clone https://github.com/Softleek/blox.git`
2. Navigate to the cloned directory: `cd blox`
3. Install development dependencies: `blox install`
4. Make your changes.
5. Test thoroughly.
6. Submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
