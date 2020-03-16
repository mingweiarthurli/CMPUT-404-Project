from django.db import models

# Create your models here.
from django.utils import timezone
from django.contrib.auth.models import User

class Friend(models.Model):
    '''
    A pair of users can only have one friend instace, since there are only following status:
    Friend (two-way follow): 2 follow fields shoud be True
    One-way follow (receiver not yet approved): rec_follow_req (False), req_follow_rec (True), not_read (True)
    One-way follow (receiver rejected): rec_follow_req (False), req_follow_rec (True), not_read (False)
    One-way follow (requester unfollowed receiver): rec_follow_req (True), req_follow_rec (False), not_read (False)
    Both unfollowed: this instance should be deleted
    '''
    # id = models.AutoField(primary_key=True)
    receiver = models.ForeignKey(User, on_delete = models.CASCADE, default=1, related_name='receiver')
    requester = models.ForeignKey(User, on_delete = models.CASCADE, default=1, related_name='requester')
    rec_follow_req = models.BooleanField(default=False)     # wheater the receiver follows requester (wheater user A approved this request)
    req_follow_rec = models.BooleanField(default=True)      # wheater the requester follows receiver
    not_read = models.BooleanField(default=True)            # wheater the receiver read this request

# class Follower(models.Model):
#     followee = models.ForeignKey(User, on_delete = models.CASCADE, related_name='followee')
#     follower = models.ForeignKey(User, on_delete = models.CASCADE, related_name='follower')
# #     def __str__(self):
# #         return ("Req: " + self.requester.displayName + " |  Rec: " + self.receiver.displayName)

# class FriendRequest(models.Model):
#     requester = models.ForeignKey(User, on_delete = models.CASCADE, related_name='friend_req')
#     receiver = models.ForeignKey(User, on_delete = models.CASCADE, related_name='friend_rec')
# #     def __str__(self):
# #         return ("Req: " + self.requester.displayName + " |  Rec: " + self.receiver.displayName)