from rest_framework import serializers
from .models import Followers, FriendRequests, Friends

class FollowersSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Followers
        fields = ('requester', 'receiver')

class FriendRequestsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FriendRequests
        fields = ('requester', 'receiver')

class FriendsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Followers
        fields = ('author', 'friends')