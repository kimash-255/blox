from django.contrib import admin
from core.models import *


admin.site.register([App, Module, ChangeLog])
# Register your models here.
