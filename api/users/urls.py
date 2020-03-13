from django.urls import path, include
<<<<<<< HEAD
from .views import AuthorView, ProfileView
=======
from django.contrib.auth import views as auth_views

from . import views
>>>>>>> 9ca2a85ee680bc3685c187693e25e503ec0fc463
from rest_framework import routers
router = routers.DefaultRouter()
<<<<<<< HEAD

router.register('', AuthorView)
router.register('profile', ProfileView)

urlpatterns = [
    path('', include(router.urls))
]
=======
router.register(r'authors', views.AuthorViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('signup/', views.signup, name='signup'),
    path('logout/', auth_views.LogoutView.as_view(), name= 'logout'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    #path('api-auth/', include('rest_framework.urls', namespace='rest_framework_api'))
]
>>>>>>> 9ca2a85ee680bc3685c187693e25e503ec0fc463
