from django.db import models
from django.utils import timezone
from users.models import Author

class Follower(models.Model):
    requester = models.ForeignKey(Author, on_delete = models.CASCADE, related_name='follow_req')
    receiver = models.ForeignKey(Author, on_delete = models.CASCADE, related_name='follow_rec')
    def __str__(self):
        return ("Req: " + self.requester.displayName + " |  Rec: " + self.receiver.displayName)

class FriendRequest(models.Model):
    requester = models.ForeignKey(Author, on_delete = models.CASCADE, related_name='friend_req')
    receiver = models.ForeignKey(Author, on_delete = models.CASCADE, related_name='friend_rec')
    def __str__(self):
        return ("Req: " + self.requester.displayName + " |  Rec: " + self.receiver.displayName)
    
class Friend(models.Model):
    author = models.ForeignKey(Author, on_delete = models.CASCADE, related_name='author')
    friends = models.ForeignKey(Author, on_delete = models.CASCADE, related_name='friends')
    def __str__(self):
        return (self.author.displayName + " | " + self.friends.displayName)

