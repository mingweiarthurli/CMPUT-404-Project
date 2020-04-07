from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, generics, mixins, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
import requests, json
from knox.models import AuthToken

from users.models import User
from users.serializers import UserSerializer, UserRawSerializer, UserSerializer, AuthorLogInSerializer
from users.permissions import IsOwnerOrAdminOrReadOnly


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

        Permission:
            Any users: read only

    list:
        Return all users,ordered by ID.
        
        Permission:
            Any users: read only

    delete:
        Remove a existing user.

        Permission:
            Admin: delete permission
            Author: delete permission
            Other users: denied

    partial_update:
        Update one or more fields on a existing user.

        Permission:
            Admin: write permission
            Author: write permission (except userType and approved fields)
            Other users: read only permission
        If the request user is unauthorized or has no permission, a status code "403 Forbidden" will be returned.

    update:
        Update a user.

        Permission:
            Admin: write permission
            Author: write permission (except userType and approved fields)
            Other users: read only permission
        If the request user is unauthorized or has no permission, a status code "403 Forbidden" will be returned.
    '''

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrAdminOrReadOnly)

    def current_author(self, req):
        if req.user.is_authenticated:
            current_author = req.user
            serializer = UserSerializer(current_author)
            jsonified = json.dumps(serializer.data)
            return Response(serializer.data)
        else:
            return Response({"authenticated": False}, status=status.HTTP_401_UNAUTHORIZED)

    def update(self, request, *args, **kwargs):
        # userType and approved fields cannot be modified by users except admin
        if ("userType" in request.data or "approved" in request.data) and (request.user.userType != "admin" or not request.user.is_superuser):
            return Response(status=status.HTTP_403_FORBIDDEN)

        # convert firstName and lastName to first_name and last_name
        if "firstName" in request.data:
            request.data["first_name"] = request.data["firstName"]
        if "lastName" in request.data:
            request.data["last_name"] = request.data["lastName"]

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = UserRawSerializer(instance, data=request.data, partial=partial, context={'request': request})  # using UserRawSerializer to update
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        response_serializer = UserSerializer(instance, many=False, context={'request': request})                    # using UserSerializer to show response
        return Response(response_serializer.data)

class LogInAPIView(generics.GenericAPIView):
    serializer_class = AuthorLogInSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class CurrentAPIView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user