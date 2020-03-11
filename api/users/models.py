from django.db import models
import uuid
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# https://medium.com/analytics-vidhya/django-rest-api-with-json-web-token-jwt-authentication-69536c01ee18


"""class UserManager(BaseUserManager):
    def create_user(self, displayName, password=None):
        if not displayName:
            raise ValueError('Users Must Have a Name')

        author = self.model(
            displayName=str(displayName)
        )
        author.set_password(password)
        author.save(using=self._db)
        return author

    def create_superuser(self, displayName, password):
        if password is None:
            raise TypeError('Superusers must have a password.')
        user = self.create_user(str(displayName), password)
        user.save()

        return user
"""


class Author(AbstractBaseUser):
    # Restricted
    id = models.UUIDField(primary_key=True, default=uuid.uuid4,
                          editable=False)  # unique author id
    host = models.URLField(max_length=100, null=False,
                           blank=False)  # author host address
    url = models.URLField(max_length=100, null=False,
                          blank=False)  # author location
    github = models.URLField(max_length=100, null=False,
                             blank=False)  # author github address
    # nickname on the site, also works as username
    displayName = models.CharField(
        max_length=60, null=False, blank=False, unique=True)

    USERNAME_FIELD = 'displayName'
    REQUIRED_FIELDS = []
    #objects = UserManager()

    def __str__(self):
        return self.displayName

    class Meta:
        db_table = 'login'
