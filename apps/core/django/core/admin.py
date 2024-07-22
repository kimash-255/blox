from django.contrib import admin
from core.models import *


admin.site.register(
    [
        App, Module
    ]
)
# Register your models here.
