from django.urls import path, include
from django.contrib.auth import views as auth_views

from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'authors', views.AuthorViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('signup/', views.signup, name='signup'),
    path('logout/', auth_views.LogoutView.as_view(), name= 'logout'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    #path('api-auth/', include('rest_framework.urls', namespace='rest_framework_api'))
]