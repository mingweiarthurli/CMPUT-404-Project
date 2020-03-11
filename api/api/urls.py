from django.contrib import admin
import uuid
from django.urls import path, include
from rest_framework import routers

# simple JWT
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter(trailing_slash=True)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include([
        path('', include('users.urls')),
        path('', include('posts.urls')),
        path('', include('friendships.urls'))]
    )),
    #path('api/comments', include('comments.urls')),
    #path('api/friendships/', include('friendships.urls')),
    #path('api-auth/', include('rest_framework.urls')),

    # simple JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]