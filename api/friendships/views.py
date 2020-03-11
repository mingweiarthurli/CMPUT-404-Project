from django.shortcuts import render
from rest_framework import viewsets
from .models import Follower, FriendRequest#, Friend
from .serializers import FollowerSerializer, FriendRequestSerializer#, FriendSerializer

class FollowerView(viewsets.ModelViewSet):
    queryset = Follower.objects.all()
    serializer_class = FollowerSerializer

class FriendRequestView(viewsets.ModelViewSet):
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer

"""

class FriendView(viewsets.ModelViewSet):
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer
"""