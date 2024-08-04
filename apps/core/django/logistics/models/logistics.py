from django.db import models
from core.models import BaseModel

class Item(BaseModel):
    id = models.AutoField(primary_key=True)
