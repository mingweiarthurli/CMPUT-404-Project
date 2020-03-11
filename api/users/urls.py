from django.conf.urls import url
from .views import SignupView, SigninView
from rest_framework import routers

urlpatterns = [
    url(r'^signup', SignupView.as_view()),
    url(r'^signin', SigninView.as_view()),
]
