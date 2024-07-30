import os


def find_project_root(current_path):
    while current_path != '/':
        if 'blox.config' in os.listdir(current_path):
            return current_path
        current_path = os.path.dirname(current_path)
    raise FileNotFoundError("Project root with 'blox.config' not found.")


def write_running_ports(django_port, nextjs_port):
    config_path = os.path.join(PROJECT_ROOT, 'config')
    sites_txt_path = os.path.join(config_path, 'sites.txt')
    sites_next_path = os.path.join(NEXTJS_PATH, '.sites')
    # Assuming you have a .env file in your project root
    env_file_path = os.path.join(NEXTJS_PATH, '.env.local')

    # Write ports to sites.txt and .sites
    with open(sites_txt_path, 'w') as f:
        f.write(f'Django PORT: {django_port}\n')
        f.write(f'NextJS PORT: {nextjs_port}\n')

    with open(sites_next_path, 'w') as f:
        f.write(f'Django_PORT={django_port}\n')
        f.write(f'NextJS_PORT={nextjs_port}\n')

    if not os.path.exists(env_file_path):
        with open(env_file_path, 'w') as f:
            f.write(f'NEXT_PUBLIC_DJANGO_PORT={django_port}\n')
            f.write(f'NEXT_PUBLIC_NEXTJS_PORT={nextjs_port}\n')
    else:
        # Update .env.local file
        with open(env_file_path, 'r') as f:
            lines = f.readlines()

        with open(env_file_path, 'w') as f:
            updated = False
            for line in lines:
                if line.startswith('NEXT_PUBLIC_DJANGO_PORT='):
                    f.write(f'NEXT_PUBLIC_DJANGO_PORT={django_port}\n')
                    updated = True
                elif line.startswith('NEXT_PUBLIC_NEXTJS_PORT='):
                    f.write(f'NEXT_PUBLIC_NEXTJS_PORT={nextjs_port}\n')
                    updated = True
                else:
                    f.write(line)

            # If variables were not updated, add them at the end
            if not updated:
                f.write(f'NEXT_PUBLIC_DJANGO_PORT={django_port}\n')
                f.write(f'NEXT_PUBLIC_NEXTJS_PORT={nextjs_port}\n')


PROJECT_ROOT = find_project_root(os.getcwd())
SETTINGS_PATH = os.path.join(
    PROJECT_ROOT, 'apps/core/django/backend/settings.py')
BASE_PATH = os.path.join(PROJECT_ROOT, 'apps/core/django')
NEXTJS_PATH = os.path.join(PROJECT_ROOT, 'apps/core/nextjs')
APPS_TXT_PATH = os.path.join(PROJECT_ROOT, 'config', 'apps.txt')
CUSTOM_APPS_PATH = os.path.join(PROJECT_ROOT, 'apps/custom')
FIELD_TYPE_MAP = {
    "TextField": {"type": "models.TextField"},
    "CharField": {"type": "models.CharField", "max_length": 255},
    "NumberField": {"type": "models.IntegerField"},
    "FloatField": {"type": "models.FloatField"},
    "DecimalField": {"type": "models.DecimalField", "max_digits": 10, "decimal_places": 2},
    "BooleanField": {"type": "models.BooleanField"},
    "DateField": {"type": "models.DateField"},
    "DateTimeField": {"type": "models.DateTimeField"},
    "TimeField": {"type": "models.TimeField"},
    "EmailField": {"type": "models.EmailField", "max_length": 254},
    "URLField": {"type": "models.URLField"},
    "SlugField": {"type": "models.SlugField", "max_length": 50},
    "UUIDField": {"type": "models.UUIDField"},
    "IPAddressField": {"type": "models.GenericIPAddressField"},
    "FileField": {"type": "models.FileField", "upload_to": "'uploads/'"},
    "ImageField": {"type": "models.ImageField", "upload_to": "'images/'"},
    "PasswordField": {"type": "models.CharField", "max_length": 128},
    "PhoneField": {"type": "models.CharField", "max_length": 15},
    "NameField": {"type": "models.CharField", "max_length": 255},
    "AddressField": {"type": "models.TextField"},
    "ForeignKey": {"type": "models.ForeignKey", "to": "'self'", "on_delete": "models.CASCADE"},
    "OneToOneField": {"type": "models.OneToOneField", "to": "'self'", "on_delete": "models.CASCADE"},
    "ManyToManyField": {"type": "models.ManyToManyField", "to": "'self'"}
}
