import uuid
import sys
from django.db import models
from users.models import Author


class Profiles(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.OneToOneField(
        Author, on_delete=models.CASCADE, related_name='profiles')
    a_email = models.EmailField(
        max_length=60, null=False, blank=False, unique=True)  # author email
    a_lastname = models.CharField(
        max_length=30, null=True, blank=True)  # lastname (opt)
    a_firstname = models.CharField(
        max_length=30, null=True, blank=True)  # firstname (opt)
    a_description = models.TextField(
        max_length=200, null=True, blank=True)  # author's bio (opt)
    a_gender = models.CharField(
        max_length=30, null=True, blank=True)  # gender (opt)

    class Meta:
        db_table = 'profiles'
