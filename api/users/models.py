from django.db import models

class Author(models.Model):
    # Restricted
    #id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  # unique author id
    displayName = models.CharField(max_length=60)
    
    def __str__(self):
        return self.displayName

class Profile(models.Model):
    alias = models.ForeignKey(Author, on_delete=models.CASCADE)
    host = models.URLField(max_length=100, null=False,
                           blank=False)  # author host address
    '''url = models.URLField(max_length=100, null=False,
                          blank=False)  # author location'''
    github = models.URLField(max_length=100, null=False,
                             blank=False)  # author github address
    # None Restricted
    a_email = models.EmailField(
        max_length=60, null=False, blank=False)  # author email
    a_lastname = models.CharField(
        max_length=30, null=True, blank=True)  # lastname (opt)
    a_firstname = models.CharField(
        max_length=30, null=True, blank=True)  # firstname (opt)
    a_description = models.TextField(
        max_length=200, null=True, blank=True)  # author's bio (opt)
    a_gender = models.CharField(
        max_length=30, null=True, blank=True)  # gender (opt)

    def __str__(self):
        return self.a_email

    class Meta:
        db_table = 'profile'
