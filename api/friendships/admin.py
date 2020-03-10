from django.contrib import admin
from .models import Follower, FriendRequest, Friend

@admin.register(Follower, FriendRequest, Friend)
class FriendshipsAdmin(admin.ModelAdmin):
    pass
#admin.site.register(Followers,FriendRequests,Friends)
# Register your models here.
