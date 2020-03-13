from django.contrib import admin
import uuid
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from api import views

router = routers.DefaultRouter(trailing_slash=True)

urlpatterns = [
    path('', views.home, name='home'),
    path('admin/', admin.site.urls),
<<<<<<< HEAD
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh', TokenRefreshView.as_view()),
    path('api/user/', include('users.urls')),
    #path('api/profile/', include('profiles.urls')),
    #path('api/comments', include('comments.urls')),
    #path('api/posts/', include('posts.urls')),
    #path('api/friendships/', include('friendships.urls')),
=======
    path('', include([
        path('', include('users.urls')),
        path('', include('posts.urls')),
        path('', include('friendships.urls'))]
    )),
    #path('api/comments', include('comments.urls')),
    #path('api/friendships/', include('friendships.urls')),
    #path('api-auth/', include('rest_framework.urls')),
>>>>>>> 9ca2a85ee680bc3685c187693e25e503ec0fc463
]