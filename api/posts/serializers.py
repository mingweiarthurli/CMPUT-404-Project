
from rest_framework import serializers
# from rest_framework.validators import UniqueTogetherValidator
from posts.models import Post, PostImage

# code reference:
# JPG; https://stackoverflow.com/questions/48756249/django-rest-uploading-and-serializing-multiple-images
class PostImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PostImage
        fields = ('image',)

class PostSerializer(serializers.HyperlinkedModelSerializer):
    images = PostImageSerializer(source='postimage_set', many=True, read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'author', 'content', 'images', 'origin_post', 'text_type', 'add_time', 'mod_time', 'visibility', 'unlist')

    def create(self, validated_data):
        images_data = self.context.get('view').request.FILES
        post = Post.objects.create(**validated_data)
        for image_data in images_data.values():
            PostImage.objects.create(post=post, image=image_data)
        return post

class PostReadOnlySerializer(serializers.HyperlinkedModelSerializer):
    images = PostImageSerializer(source='postimage_set', many=True, read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'author', 'content', 'images', 'origin_post', 'text_type', 'add_time', 'mod_time', 'visibility', 'unlist')
        read_only_fields = ('author', 'content', 'images', 'origin_post', 'text_type', 'visibility', 'unlist')

    def create(self, validated_data):
        images_data = self.context.get('view').request.FILES
        post = Post.objects.create(**validated_data)
        for image_data in images_data.values():
            PostImage.objects.create(post=post, image=image_data)
        return post