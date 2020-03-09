from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('friends', views.FollowersView)
router.register('friends', views.FriendRequestsView)
router.register('friends', views.FriendsView)

urlpatterns = [
    path('', include(router.urls)),
]