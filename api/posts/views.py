from django.shortcuts import render

# Create your views here.
import json
from rest_framework import viewsets, generics, mixins
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from django.db.models import Q, Count
from django.http import Http404, HttpResponseBadRequest
from django.shortcuts import get_object_or_404

from posts.models import Post, Comment
from posts.serializers import PostSerializer, CommentSerializer, CommentEditSerializer
from posts.permissions import IsAuthorOrReadOnly

from friends.models import Friend

from config.settings import DEFAULT_HOST

import sys
sys.path.append("..") 
import connection_helper as helper

def dict_to_json(dict):
    return json.loads(json.dumps(dict))

def check_friend(user_url, author_url):
    '''
    check whether the given users are friend
    '''
    # check both sides to avoid any accidence
    num_friends1 = Friend.objects.filter(Q(followee_url=author_url) & Q(follower_url=user_url) & Q(mutual=True)).count()
    num_friends2 = Friend.objects.filter(Q(followee_url=user_url) & Q(follower_url=author_url) & Q(mutual=True)).count()
    num_friends = num_friends1 + num_friends2
    if num_friends > 0:     # local server has record of this pair of friend
        return True
    else:                   # check remote server
        response = helper.check_friend(user_url, author_url)
        return response

def check_FOAF(user_url, author_url):
    '''
    Check whether the given users are FOAF.
    '''
    visible = check_friend(user_url, author_url)

    if visible:         # if are friend, return True
        return True
    else:               # if not friend, then check if they are FOAF
        response = helper.check_FOAF(user_url, author_url)
        return response

def get_visible_posts(posts, user):
    user_url = f"{user.host}author/{user.id}"
    user_host = user.host
    visible_posts = []

    for post in posts:
        author_url = post["author"]["id"]
        author_host = post["author"]["host"]
        if post["author"]["id"] == user_url:                                        # current user's post
            visible_posts.append(post)
        elif post["visibility"] == "PUBLIC":                                        # public post
            visible_posts.append(post)
        elif post["visibility"] == "SERVERONLY" and user_host == author_host:       # current user in the same server with the author
            visible_posts.append(post)
        elif post["visibility"] == "PRIVATE" and user_url in post["visibleTo"]:     # current user in the visibleTo list
            visible_posts.append(post)
        elif post["visibility"] == "FRIENDS":                                       # current user is the friend of the author
            friend_status = check_friend(user_url, author_url)
            if friend_status:
                visible_posts.append(post)
        elif post["visibility"] == "FOAF":                                          # current user is the FOAF of the author
            FOAF_status = check_FOAF(user_url, author_url)
            if FOAF_status:
                visible_posts.append(post)

    return visible_posts

def get_user_posts(posts, user_id):
    '''
    Get posts of specific author.
    '''
    user_post_list = []
    for post in posts:
        post_author_host = post["author"]["host"]
        post_author_url = post["author"]["id"]
        if post_author_url == f"{post_author_host}author/{user_id}":
            user_post_list.append(post)

    return user_post_list

def get_public_posts(posts):
    '''
    Return the public posts of the given posts.
    '''
    public_posts = []
    for post in posts:
        if post["visibility"] == "PUBLIC":
            public_posts.append(post)
    return public_posts

def get_posts(user, only_public, specify_author, author_id):
    '''
    Return the posts that the user has permission to see.
    If only_public is True, return only public posts.
    If specify_author is True, return the posts of specified user.
    '''
    queryset = Post.objects.filter(Q(unlisted=False))      # local posts
    serializer = PostSerializer(queryset, many=True)

    remote_posts = helper.get_remote_posts()
    post_list = serializer.data + remote_posts

    if only_public and specify_author:
        post_list = get_public_posts(post_list)
        post_list = get_user_posts(post_list, author_id)
    elif only_public:
        post_list = get_public_posts(post_list)
    elif specify_author:
        post_list = get_user_posts(post_list, author_id)
        post_list = get_visible_posts(post_list, user)
    else:
        post_list = get_visible_posts(post_list, user)

    return post_list

def check_psot_permission(post, user):
    '''
    Check whether the user has permission to read the given post.
    Input is serialized post.
    Return True or False.
    '''
    user_url = f"{user.host}author/{user.id}"
    user_host = user.host

    author_url = post["author"]["id"]
    author_host = post["author"]["host"]
    if post["author"]["id"] == user_url:                                        # current user's post
        return True
    elif post["visibility"] == "PUBLIC":                                        # public post
        return True
    elif post["visibility"] == "SERVERONLY" and user_host == author_host:       # current user in the same server with the author
        return True
    elif post["visibility"] == "PRIVATE" and user_url in post["visibleTo"]:     # current user in the visibleTo list
        return True
    elif post["visibility"] == "FRIENDS":                                       # current user is the friend of the author
        friend_status = check_friend(user_url, author_url)
        return friend_status
    elif post["visibility"] == "FOAF":                                          # current user is the FOAF of the author
        FOAF_status = check_FOAF(user_url, author_url)
        return FOAF_status

    return False

# code reference:
# Andreas Poyiatzis; https://medium.com/@apogiatzis/create-a-restful-api-with-users-and-jwt-authentication-using-django-1-11-drf-part-2-eb6fdcf71f45
class PostViewSet(viewsets.ModelViewSet):
    '''
    retrieve:
        Return a post instance.

        Permission:
            Any users: read only permission with posts shared with them
        If the request user is unauthorized or has no permission, a status code "403 Forbidden" will be returned.

    list:
        Return all listed public posts.

        Permission:
            Any users: read only permission with posts shared with them

    create:
        Create a new post.

        Permission:
            Any users: write permission

    delete:
        Remove a existing post.

        Permission:
            Author: delete permission
            Other users: denied

    partial_update:
        Update one or more fields on a existing post.

        Permission:
            Author: write permission
            Other users: read only permission
        If the request user is unauthorized or has no permission, a status code "403 Forbidden" will be returned.

    update:
        Update a post.

        Permission:
            Author: write permission
            Other users: read only permission
        If the request user is unauthorized or has no permission, a status code "403 Forbidden" will be returned.

    visible_posts:
        Return all posts that visible to the currently authenticated user.

    visible_user_posts:
        Return all posts of specified user that visible to the currently authenticated user.
    '''
    queryset = Post.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly)
    def get_post_object(self, pk):
        try:
            return Post.objects.get(id=pk)
        except Post.DoesNotExist:
            raise Http404
    
    def get_serializer_class(self):
        return PostSerializer

    # associate Post with User
    # see more: https://www.django-rest-framework.org/tutorial/4-authentication-and-permissions/#associating-snippets-with-users
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def list(self, request):
        public_post_list = get_posts(request.user, True, False, None)

        return Response(public_post_list)

    def retrieve(self, request, pk):
        post = self.get_post_object(pk)
        serializer = PostSerializer(post, many=False)

        if check_psot_permission(serializer.data, self.request.user):
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    @action(detail=False, methods="GET")
    def visible_posts(self, request, *args, **kwargs):
        if self.request.user.is_anonymous:      # to check if current user is an anonymous user first, since Q query cannot accept anonymous user
            public_post_list = get_posts(request.user, True, False, None)
            return Response(public_post_list)
        else:
            visible_post_list = get_posts(request.user, False, False, None)

            return Response(visible_post_list)

    @action(detail=False, methods="GET")
    def visible_user_posts(self, request, *args, **kwargs):
        user_id = self.kwargs['user_id']

        if self.request.user.is_anonymous:      # to check if current user is an anonymous user first, since Q query cannot accept anonymous user
            public_user_post_list = get_posts(request.user, True, True, user_id)

            return Response(public_user_post_list)
        else:
            visible_user_post_list = get_posts(request.user, False, True, user_id)

            return Response(visible_user_post_list)

class CommentViewSet(viewsets.ModelViewSet):
    '''
    retrieve:
        Return a comment instance.

        Permission:
            Any users: read only permission with posts shared with them

    list:
        Return all comments of the specified post.

        Permission:
            Any users: read only permission with posts shared with them

    create:
        Create a new comment for the specified post.

        Following fields will be generated automatically:
        post: post UUID that specified as post_id in URL 
        author: current user
        published: current time
        id: auto-generated UUID

        Expected POST request body formmat:
        {
            "comment": "string",
            "contentType": "text/plain",
        }
        If createed successfully, a following body will be returned with status code "200 OK":
        {
            "query": "addComment",
            "success":true,
            "message":"Comment Added"
        }
        If the request user is unauthorized or has no permission, a status code "403 Forbidden" will be returned with body:
        {
            "query": "addComment",
            "success":false,
            "message":"Comment not allowed"
        }

    delete:
        Remove a existing comment.

        Permission:
            Author: delete permission
            Other users: denied

    partial_update:
        Update one or more fields on a existing comment.

        Permission:
            Author: write permission
            Other users: read only permission
        If the request user is unauthorized or has no permission, a status code "403 Forbidden" will be returned.

    update:
        Update a comment.

        Permission:
            Author: write permission
            Other users: read only permission
        If the request user is unauthorized or has no permission, a status code "403 Forbidden" will be returned.
    '''
    queryset = Comment.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly)

    def get_serializer_class(self):
        if self.action == 'create' or self.action == 'update':
            return CommentEditSerializer
        # elif self.action == 'update':
        #     return FriendSerializer
        # return PostReadOnlySerializer
        return CommentSerializer

    # using perform_create to add default author doesn't work for the inherited create function
    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

    def create(self, request, *args, **kwargs):
        post_id = kwargs['post_id']
        request.data["post"] = post_id

        ok_response = dict_to_json({"query": "addComment", "success": True, "message": "Comment Added"})
        forbidden_response = dict_to_json({"query": "addComment", "success": False, "message": "Comment not allowed"})

        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            raise Http404
        post_serializer = PostSerializer(post, many=False)

        if check_psot_permission(post_serializer.data, self.request.user):      # if the user has permission to read the post
            request.data["author"] = request.user.id
            serializer = self.get_serializer_class()(data=request.data, context={'request': request})

            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(ok_response, status=status.HTTP_200_OK)
        else:
            return Response(forbidden_response, status=status.HTTP_403_FORBIDDEN)

    def list(self, request, *args, **kwargs):
        post_id = kwargs['post_id']
        queryset = Comment.objects.filter(Q(post=post_id))
        serializer = self.get_serializer_class()(queryset, many=True, context={'request': request})
        return Response(serializer.data)
