from django.shortcuts import render
from rest_framework import viewsets, generics, mixins
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
import re
import json
from django.db.models import Q
from django.http import Http404, HttpResponseBadRequest

from users.models import User
from users.serializers import UserSerializer


# code reference:
# Andreas Poyiatzis; https://medium.com/@apogiatzis/create-a-restful-api-with-users-and-jwt-authentication-using-django-1-11-drf-part-2-eb6fdcf71f45
class UserViewSet(mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    '''
    retrieve:
        Return a user instance.

    list:
        Return all users,ordered by ID.

    delete:
        Remove a existing user.

    partial_update:
        Update one or more fields on a existing user.

    update:
        Update a user.
    '''
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CurrentUserView(APIView):
    '''
    Return information of current logged-in user.

    If the current user is not logged-in (anonymous user), a status code "400 Bad Rquest" will be returned, else a status code "200 OK" and current user information will be returned.
    '''
    
    def get(self, request):
        if request.user.is_anonymous: 
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            print(request.user.id)
            current_user = User.objects.get(id=request.user.id)
            serializer = UserSerializer(current_user)
            return Response(serializer.data)