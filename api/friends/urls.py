from django.conf.urls import url, include
from rest_framework import routers
from friends.views import FriendView, FriendRequestRejectView, FriendRequestAcceptView, UserFriendListView, UserFollowerListView, UserFriendRequestView, FOAFViewSet

router = routers.DefaultRouter()
router.register(r'FOAF', FOAFViewSet, basename='FOAF')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^friends/$', FriendView.as_view({'get': 'list', 'post': 'create'})),
    url(r'^friends/(?P<pk>.+)/update$', FriendView.as_view({'put': 'update'})),
    url(r'^friends/(?P<pk>.+)/delete$', FriendView.as_view({'delete': 'destroy'})),
    url(r'^friends/(?P<pk>.+)/reject$', FriendRequestRejectView.as_view()),
    url(r'^friends/(?P<pk>.+)/accept$', FriendRequestAcceptView.as_view()),
    url(r'^friends/(?P<user_id>.+)/$', UserFriendListView.as_view()),
    url(r'^followers/(?P<user_id>.+)/$', UserFollowerListView.as_view()),
    url(r'^friend_requests/(?P<user_id>.+)/$', UserFriendRequestView.as_view()),
]