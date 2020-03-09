from django.db import models
from django.utils import timezone
from users.models import Author

class Followers(models.Model):
    requester = models.ForeignKey(Author, on_delete = models.CASCADE, related_name='follow_req')
    receiver = models.ForeignKey(Author, on_delete = models.CASCADE, related_name='follow_rec')

class FriendRequests(models.Model):
    requester = models.ForeignKey(Author, on_delete = models.CASCADE, related_name='friend_req')
    receiver = models.ForeignKey(Author, on_delete = models.CASCADE, related_name='friend_rec')
    
class Friends(models.Model):
    author = models.ForeignKey(Author, on_delete = models.CASCADE, related_name='author')
    friends = models.ForeignKey(Author, on_delete = models.CASCADE, related_name='friends')

