from rest_framework import serializers
from .models import Author

class AuthorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Author
        #Note: id, url and host are not modifiable by authors themselves
        #fields = ['id', 'url', 'host', 'displayName', 'github', 'a_email', 'a_firstname', 'a_lastname', 'a_description', 'a_birthdate']
        #read_only_fields = ['id', 'url', 'approved']
        fields = ['id', 'approved', 'displayName', 'a_firstname', 'a_lastname']
