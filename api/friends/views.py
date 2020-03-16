from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, generics, mixins
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from friends.models import Friend
from friends.serializers import FriendReadOnlySerializer, FriendReceiverSerializer, FriendRequesterSerializer

class FriendView(mixins.CreateModelMixin, 
                 mixins.UpdateModelMixin,
                 mixins.DestroyModelMixin,
                 mixins.ListModelMixin,
                 viewsets.GenericViewSet):
    '''
    list:
        Return all friends of all users, ordered by friendship event ID.

    create:
        Create a friendship event between two users.
        Status code "400 Bad Request" will be returned, if user field and friend field are same.

    delete:
        Remove a existing friendship event by friendship event ID.

    partial_update:
        Update one or more fields on a existing friendship event.

    update:
        Update a friendship event.
    '''
    queryset = Friend.objects.all()
    # serializer_class = FriendReadOnlySerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return FriendRequesterSerializer
        return FriendReadOnlySerializer

    def list(self, request):
        queryset = Friend.objects.all()
        # serializer = FriendReadOnlySerializer(queryset, many=True, context={'request': request})
        serializer = self.get_serializer_class()(queryset, many=True, context={'request': request})
        return Response(serializer.data)
    
    def create(self, request):
        # serializer = FriendRequesterSerializer(data=request.data, context={'request': request})
        serializer = self.get_serializer_class()(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'OK'})
        return Response(serializer.errors, status=400)

class UserFriendListView(generics.ListAPIView):
    '''
    retrieve:
        Return all friends of specified user_id.
    '''

    # see more: https://www.django-rest-framework.org/api-guide/filtering/#filtering-against-the-url
    serializer_class = FriendReadOnlySerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Friend.objects.filter(Q(receiver=user_id) | Q(requester=user_id))
        # return Friend.objects.filter(receiver=user_id)

# class FriendRequestView(APIView):
#     '''
#     create:
#         Create a friendship event between two users.
#         Status code "400 Bad Request" will be returned, if user field and friend field are same.
#     '''
#     def post(self, request, format=None):
#         serializer = FriendRequesterSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({'status': 'OK'})
#         return Response(serializer.errors, status=400)


# class FollowerView(viewsets.ModelViewSet):
#     queryset = Follower.objects.all()
#     serializer_class = FollowerSerializer

# class FriendRequestView(viewsets.ModelViewSet):
#     queryset = FriendRequest.objects.all()
#     serializer_class = FriendRequestSerializer