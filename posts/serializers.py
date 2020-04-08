
from rest_framework import serializers
# from rest_framework.validators import UniqueTogetherValidator
import json
from django.db.models import Q, Count
from posts.models import Post, Comment
from users.serializers import AuthorInfoSerializer

from config.settings import DEFAULT_HOST

class ListField(serializers.JSONField):
    def to_representation(self, obj):
        # Use the method `get_params` from the Awesome class
        return json.loads(obj)

    def to_internal_value(self, data):
        # Set the key `date` just for the example
        print(type(data))
        print(data)
        return json.dumps(data)

class CommentSerializer(serializers.ModelSerializer):
    author = AuthorInfoSerializer(many=False, read_only=True)

    class Meta:
        model = Comment
        fields = ('author', 'comment', 'contentType', 'published', 'id')

class CommentEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('post', 'author', 'comment', 'contentType', 'published', 'id')

class PostSerializer(serializers.HyperlinkedModelSerializer):
    author = AuthorInfoSerializer(many=False, read_only=True)
    source = serializers.SerializerMethodField()
    origin = serializers.SerializerMethodField()
    count = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    # comments = CommentSerializer(many=True, read_only=True)
    categories = ListField()
    visibleTo = ListField()

    class Meta:
        model = Post
        fields = ('title', 'source', 'origin', 'description', 'contentType', 'content', 
                  'author', 'categories', 'count', 'comments', 'published', 
                  'id', 'visibility', 'visibleTo', 'unlisted')
        # fields = ('title', 'source', 'origin', 'description', 'contentType', 'content', 
        #           'author', 'categories', 'size', 'next', 'comments', 'published', 
        #           'id', 'visibility', 'visibleTo', 'unlisted')

    def get_source(self, obj):
        if obj.source == "":
            return f"{DEFAULT_HOST}posts/{obj.id}"
        else:
            return obj.source

    def get_origin(self, obj):
        if obj.origin == "":
            return f"{DEFAULT_HOST}posts/{obj.id}"
        else:
            return obj.origin

    def get_count(self, obj):
        return Comment.objects.filter(Q(post=obj.id)).count()
    
    def get_comments(self, obj):
        queryset = Comment.objects.filter(Q(post=obj.id))
        return CommentSerializer(queryset, many=True).data