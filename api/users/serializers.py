from rest_framework import serializers
from .models import Author, Profile

class AuthorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Author
<<<<<<< HEAD
        # Note: id, url and host are not modifiable by authors themselves
        fields = ('id', 'url', 'displayName')

class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'url', 'alias', 'host', 'github', 'a_email', 'a_lastname', 'a_firstname', 'a_description', 'a_gender')

'''class SignupSerializer(serializers.HyperlinkedModelSerializer):

    profile = AuthorSerializer(required=False)

    class Meta:
        model = Author
        fields = ('displayName', 'password', 'profile')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        new_user = Author.objects.create_user(**validated_data)
        Profile.objects.create(
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
'''
=======
        #Note: id, url and host are not modifiable by authors themselves
        #fields = ['id', 'url', 'host', 'displayName', 'github', 'a_email', 'a_firstname', 'a_lastname', 'a_description', 'a_birthdate']
        #read_only_fields = ['id', 'url', 'approved']
        fields = ['id', 'approved', 'displayName', 'a_firstname', 'a_lastname']
>>>>>>> 9ca2a85ee680bc3685c187693e25e503ec0fc463
