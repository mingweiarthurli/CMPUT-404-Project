from django.contrib import admin
import uuid
from django.urls import path, include
from rest_framework import routers

router = routers.DefaultRouter(trailing_slash=True)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/profiles/', include('profiles.urls')),
    #path('api/comments', include('comments.urls')),
    path('api/posts/', include('posts.urls')),
    path('api/friendships/', include('friendships.urls')),
    path('api-auth/', include('rest_framework.urls')),
]