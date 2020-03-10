from rest_framework import serializers
from .models import Follower, FriendRequest, Friend

class FollowerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Follower
        fields = ('requester', 'receiver')

class FriendRequestSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ('requester', 'receiver')

class FriendSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Friend
        fields = ('author', 'friends')