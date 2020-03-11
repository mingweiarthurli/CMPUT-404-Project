from django.db import models
from django.utils import timezone
from users.models import Author

VISIBILITY_CHOICES = [(1, "public"), 
                      (2, "private"),
                      (3, "friends"), 
                      (4, "friends and friends of friends"), 
                      (5, "another author"), 
                      (6, "friends on the same host"), ]

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    published = models.DateTimeField(default=timezone.now)
    # author = models.ForeignKey(Author, on_delete = models.CASCADE, related_name='post_author') # %
    title = models.CharField(blank=True, default='Title Unknown', max_length=100)
    # source = models.URLField(null=False, blank=False) # ph
    # origin = models.URLField(null=False, blank=False) # ph
    description = models.TextField(blank=True, default='No Description', max_length=400)
    # contentType = ['text/plain', 'text/markdown', 'image/png', 'image/jpeg'] # %
    contentType = ['text/plain', 'text/markdown']
    content = models.TextField(blank=True, max_length=2000)
    categories = ['web', 'tutorial']
    #count = 0
    #size = 0
    #next = models.URLField(blank=True)
    #comments = {}
    visibility = models.IntegerField(choices=VISIBILITY_CHOICES, default='1')
    # visibleTo = ['PUBLIC']
    unlisted = models.BooleanField(default=False) # 
