from django.shortcuts import render
from rest_framework import status, viewsets, permissions
from .serializers import AuthorSerializer, ProfileSerializer
from .models import Author, Profile

class AuthorView(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class ProfileView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    
'''class SignupView(CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        response = {
            'success': 'True',
            'status code': status.HTTP_200_OK,
            'message': 'User registered  successfully',
        }
        status_code = status.HTTP_200_OK
        return Response(response, status=status_code)


class SigninView(RetrieveAPIView):
    serializer_class = SigninSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = {
            'success': 'True',
            'status code': status.HTTP_200_OK,
            'message': 'User logged in  successfully',
            'token': serializer.data['token'],
        }
        status_code = status.HTTP_200_OK

        return Response(response, status=status_code)
'''