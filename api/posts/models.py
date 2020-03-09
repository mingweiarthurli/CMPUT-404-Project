from django.db import models
from django.utils import timezone
from users.models import Author

class Posts(models.Model):
    title = models.CharField(blank=True, default='Title Unknown', max_length=100) #
    source = models.URLField(null=False, blank=False) # ph
    origin = models.URLField(null=False, blank=False) # ph
    description = models.TextField(blank=True, default='No Description', max_length=400) #
    contentType = ['text/plain', 'text/markdown', 'image/png', 'image/jpeg'] # %
    content = models.TextField(blank=True, max_length=2000) # 
    author = models.ForeignKey(Author, on_delete = models.CASCADE, related_name='post_author') # %
    categories = ['web', 'tutorial'] # %
    #count = 0
    #size = 0
    #next = models.URLField(blank=True)
    #comments = {}
    published = models.DateTimeField(default=timezone.now)
    id = models.AutoField(primary_key=True, null=False) #
    visibility = models.CharField(blank=True, default='PUBLIC', max_length=30) # %
    visibleTo = ['PUBLIC']
    unlisted = models.BooleanField(default=False) # 
