
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from posts.models import Post

class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'author', 'content', 'publish_time')