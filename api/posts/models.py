from django.db import models

# Create your models here.
from django.utils import timezone
from django.contrib.auth.models import User

class Post(models.Model):
    # id = models.AutoField(primary_key=True)
    author = models.ForeignKey(User, on_delete = models.CASCADE, default=1)
    content = models.TextField(blank=True, max_length=2000)
    publish_time = models.DateTimeField(default=timezone.now)