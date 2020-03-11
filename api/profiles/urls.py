from django.conf.urls import url
from .views import ProfilesView
from rest_framework import routers

urlpatterns = [
    url(r'^profiles', ProfilesView.as_view()),
]
