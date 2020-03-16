from django.conf.urls import url, include
from rest_framework import routers
from friends.views import FriendView, UserFriendListView

router = routers.DefaultRouter()
# router.register(r'friends', FriendView, basename='friends')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^friends/$', FriendView.as_view({'get': 'list', 'post': 'create'})),
    url(r'^friends/(?P<pk>.+)$', FriendView.as_view({'delete': 'destroy'})),
    url(r'^friends/(?P<user_id>.+)/$', UserFriendListView.as_view()),
]