from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .models import Post
from .serializers import PostsSerializer

class PostsViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostsSerializer
    permission_classes = [permissions.IsAuthenticated]
