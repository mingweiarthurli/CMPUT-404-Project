from django.db import models
import uuid

class Author(models.Model):
    # Restricted
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) #unique author id
    host = models.URLField(max_length=100, null=False, blank=False) #author host address
    url = models.URLField(max_length=100, null=False, blank=False) #author location
    github = models.URLField(max_length=100, null=False, blank=False) #author github address
    displayName = models.CharField(max_length=60, null=False, blank=False, default=id) #nickname on the site, default author_id
    # Modifiable
    a_email = models.EmailField(max_length=50, null=False, blank=False) #author email
    a_lastname = models.CharField(max_length=30, null=False, blank=False) #lastname
    a_firstname = models.CharField(max_length=30, null=False, blank=False) #firstname
    a_description = models.TextField(max_length=200, null=True, blank=True) #author's bio (opt)
    a_birthdate = models.DateField(null=True, blank=True) #author's birthdate (opt)
    