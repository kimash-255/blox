FIELD_TYPE_MAP = {
    "TextField": {"type": "models.TextField"},
    "CharField": {"type": "models.CharField", "max_length": 255},
    "NumberField": {"type": "models.IntegerField"},
    "FloatField": {"type": "models.FloatField"},
    "DecimalField": {
        "type": "models.DecimalField",
        "max_digits": 10,
        "decimal_places": 2,
    },
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
    "SelectField": {
        "type": "models.CharField",
        "max_length": 255,
    },
    "SmallTextField": {"type": "models.CharField", "max_length": 100},
    "ForeignKey": {
        "type": "models.ForeignKey",
        "on_delete": "models.CASCADE",
    },
    "OneToOneField": {
        "type": "models.OneToOneField",
        "on_delete": "models.CASCADE",
    },
    "ManyToManyField": {"type": "models.ManyToManyField"},
}
