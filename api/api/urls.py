from django.contrib import admin
import uuid
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter(trailing_slash=True)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh', TokenRefreshView.as_view()),
    path('api/user/', include('users.urls')),
    #path('api/profile/', include('profiles.urls')),
    #path('api/comments', include('comments.urls')),
    #path('api/posts/', include('posts.urls')),
    #path('api/friendships/', include('friendships.urls')),
]