from django.shortcuts import render
from rest_framework import viewsets
from .models import Followers, FriendRequests, Friends
from .serializers import FollowersSerializer, FriendRequestsSerializer, FriendsSerializer

class FollowersView(viewsets.ModelViewSet):
    queryset = Followers.objects.all()
    serializer_class = FollowersSerializer

class FriendRequestsView(viewsets.ModelViewSet):
    queryset = FriendRequests.objects.all()
    serializer_class = FriendRequestsSerializer

class FriendsView(viewsets.ModelViewSet):
    queryset = Friends.objects.all()
    serializer_class = FriendsSerializer