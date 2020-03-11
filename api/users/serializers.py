from rest_framework import serializers
from .models import Author
from profiles.models import Profiles
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from rest_framework_jwt.settings import api_settings

JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profiles
        # Note: id, url and host are not modifiable by authors themselves
        fields = ('a_email', 'a_firstname', 'a_lastname',
                  'a_description', 'a_gender')
        read_only_fields = ('id')


class SignupSerializer(serializers.ModelSerializer):

    profile = AuthorSerializer(required=False)

    class Meta:
        model = Author
        fields = ('displayName', 'password', 'profile')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        new_user = Author.objects.create_user(**validated_data)
        Profiles.objects.create(
            author=new_user,
            email=profile_data['email'],
            firstname=profile_data['firstname'],
            lastname=profile_data['lastname'],
            description=profile_data['description'],
            gender=profile_data['gender']
        )
        return new_user


class SigninSerializer(serializers.Serializer):
    displayName = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        displayName = data.get("displayName", None)
        password = data.get("password", None)
        user = authenticate(displayName=displayName, password=password)
        if user is None:
            raise serializers.ValidationError(
                'A user with this name and password is not found.'
            )
        try:
            payload = JWT_PAYLOAD_HANDLER(user)
            jwt_token = JWT_ENCODE_HANDLER(payload)
            update_last_login(None, user)
        except Author.DoesNotExist:
            raise serializers.ValidationError(
                'User with given displayName and password does not exists'
            )
        return {
            'displayName': user.displayName,
            'token': jwt_token
        }
