from rest_framework import serializers
from .models import Post

class PostsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = ('title','source', 'origin', 'description', 'contentType', 'content', 'author', 'categories', 'published', 'id', 'visibility', 'unlisted')
