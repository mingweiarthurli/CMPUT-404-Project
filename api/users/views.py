<<<<<<< HEAD
from django.shortcuts import render
from rest_framework import status, viewsets, permissions
from .serializers import AuthorSerializer, ProfileSerializer
from .models import Author, Profile
=======
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from rest_framework import viewsets
from rest_framework import permissions
from .models import Author
from .serializers import AuthorSerializer
>>>>>>> 9ca2a85ee680bc3685c187693e25e503ec0fc463

from .forms import SignUpForm

class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
<<<<<<< HEAD

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
=======
    permission_classes = [permissions.IsAuthenticated]

def signup(request):
    if request.method == "POST":
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')
    else:
        form = SignUpForm()

    return render(request, 'signup.html', {'form' : form})
>>>>>>> 9ca2a85ee680bc3685c187693e25e503ec0fc463
