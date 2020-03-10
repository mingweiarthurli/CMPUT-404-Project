from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'followers', views.FollowerView)
router.register(r'friendRequests', views.FriendRequestView)
router.register(r'friends', views.FriendView)

urlpatterns = [
    path('', include(router.urls)),
]