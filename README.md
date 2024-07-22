# Blox CLI

Blox CLI is a command-line interface tool designed to streamline development tasks for projects using the Blox framework, which integrates seamlessly with Django and Next.js.

## Installation

### Prerequisites

Before installing Blox CLI, ensure you have the following installed on your system:

- **Python**: Blox CLI requires Python 3.x. If you don't have Python installed, download and install it from [python.org](https://www.python.org/downloads/).
- **Pip**: Pip is the package installer for Python. It should be installed automatically when you install Python.
- **Node.js**: Blox CLI requires Node.js version 20. If you don't have Node.js installed, download and install it from [nodejs.org](https://nodejs.org/).

### Setup Environment

#### Clone the Repository

Clone your Blox project repository from GitHub:

```bash
git clone https://github.com/Softleek/blox.git
cd blox
```

#### Create a Virtual Environment

It's a good practice to use a virtual environment to isolate your project dependencies from other Python projects.

**Using venv:**

- **Windows:**

  ```bash
  python -m venv env
  ```

- **Unix or MacOS:**

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
blox setup
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

#### Setup environment

```bash
blox setup
```

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

Install node dependencies.

```bash
blox npm install dep1 dep2
```

Install node dependencies for a custom app.

```bash
blox npm install --app appname dep1 dep2
```

or

```bash
blox npm i dep1 dep2
blox npm i --app appname dep1 dep2
```

Install python packages.

```bash
blox pip install package1 package1
```

Install python packages for a custom app..

```bash
blox pip install --app appname  package1 package1
```

or

```bash
blox pip i package1 package1
blox pip i --app appname  package1 package1
```

### Command: blox startapp

Create and start a new application.

```bash
blox startapp [appname]
```

Example:

```bash
blox startapp myapp
```

### Command: blox deleteapp

Delete an application.

```bash
blox deleteapp [appname]
```

Example:

```bash
blox deleteapp myapp
```

### Command: blox addmodule

Create and start a new module.

```bash
blox addmodule [appname] [modulename]
```

Example:

```bash
blox addmodule myapp mymodule
```

### Command: blox deletemodule

Delete a module.

```bash
blox deletemodule [appname] [modulename]
```

Example:

```bash
blox deletemodule myapp mymodule
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
