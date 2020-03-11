from rest_framework import serializers
from .models import Post

class PostsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'published', 'title', 'description', 'contentType', 'content', 'categories', 'visibility', 'unlisted')
