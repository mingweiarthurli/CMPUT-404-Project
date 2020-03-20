from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, generics, mixins
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from django.db.models import Q
from django.http import Http404, HttpResponseBadRequest

from posts.models import Post
from posts.serializers import PostImageSerializer, PostSerializer, PostReadOnlySerializer


# code reference:
# Andreas Poyiatzis; https://medium.com/@apogiatzis/create-a-restful-api-with-users-and-jwt-authentication-using-django-1-11-drf-part-2-eb6fdcf71f45
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'create':
            return PostSerializer
        # elif self.action == 'update':
        #     return FriendSerializer
        return PostReadOnlySerializer
        # return PostSerializer

    def list(self, request):
        queryset = Post.objects.filter(Q(visibility=1) & Q(unlist=False))
        # serializer = PostSerializer(queryset, many=True, context={'request': request})
        serializer = self.get_serializer_class()(queryset, many=True, context={'request': request})
        return Response(serializer.data)

class VisiblePostView(generics.ListAPIView):
    '''
    get_queryset:
        Return all posts that visible to the currently authenticated user.
    '''

    # TODO: change the filter to adhere user perimision

    # see more: https://www.django-rest-framework.org/api-guide/filtering/#filtering-against-the-url
    serializer_class = PostReadOnlySerializer

    def get_queryset(self):
        # user_id = self.kwargs['user_id']
        return Post.objects.filter(Q(unlist=False))

class VisibleUserPostView(generics.ListAPIView):
    '''
    get_queryset:
        Return all posts that visible to the currently authenticated user.
    '''

    # TODO: change the filter to adhere user perimision

    # see more: https://www.django-rest-framework.org/api-guide/filtering/#filtering-against-the-url
    serializer_class = PostReadOnlySerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Post.objects.filter(Q(author=user_id) & Q(unlist=False))