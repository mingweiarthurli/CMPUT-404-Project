from django.db import models

# Create your models here.
import uuid
import json

from config.settings import DEFAULT_HOST

class Host(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    baseURL = models.URLField(null=False, blank=False)
    username = models.CharField(blank=False, max_length=200)
    password = models.CharField(blank=False, max_length=200)