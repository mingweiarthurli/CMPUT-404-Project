
from rest_framework import serializers
# from rest_framework.validators import UniqueTogetherValidator
import json
from django.db.models import Q, Count
from hosts.models import Host

from config.settings import DEFAULT_HOST

class HostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Host
        fields = ('id', 'baseURL', 'username', 'password')