from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Author

    #first_name = forms.CharField(max_length=30)
    #last_name = forms.CharField(max_length=30)
    #host = forms.URLField(max_length=100)
    #url = forms.URLField(max_length=100)
    #github = forms.URLField(max_length=100)

class SignUpForm(UserCreationForm):
    email = forms.CharField(max_length=50, required=True, widget=forms.EmailInput())
    class Meta:
        model = User
        fields = ('username','email', 'password1', 'password2')
