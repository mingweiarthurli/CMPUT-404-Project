from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .models import Post
from .serializers import PostsSerializer

class PostsPermissions(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # only author of the posts can PUT and DELETE
        if request.method in ["PUT", "DELETE"]:
            return obj.author == request.user
        elif request.method == "GET":
            if obj.author == request.user:      # is author
                return True
            elif obj.visibility == 2:           # not author and the post is private
                return False
            # elif obj.visibility == 3:           # not author and the post is friends visible
            #     # TODO: check friendship
            # elif obj.visibility == 4:           # not author and the post is FOAF visible
            #     # TODO: check friendship
            # elif obj.visibility == 5:           # not author and the post is another author visible
            #     # TODO: check author
            # elif obj.visibility == 6:           # not author and the post is friends on same host visible
            #     # TODO: check friendship
            else:                               # public
                return True

class PostsViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostsSerializer
    # permission_classes = [PostsPermissions]
