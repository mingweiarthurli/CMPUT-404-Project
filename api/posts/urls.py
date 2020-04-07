from django.conf.urls import url, include
from rest_framework import routers
from posts.views import PostViewSet, CommentViewSet

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^author/posts$', PostViewSet.as_view({'get':'visible_posts'})),
    url(r'^author/(?P<user_id>.+)/posts$', PostViewSet.as_view({'get':'visible_user_posts'})),
    url(r'^posts/(?P<post_id>.+)/comments$', CommentViewSet.as_view({'get': 'list', 'post': 'create'})),
]