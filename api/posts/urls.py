from django.urls import path, include
from posts import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'posts', views.PostsViewSet)

urlpatterns = [
    path('posts/new/', views.new, name='new_post'),
    path('posts/', views.home , name='posts'),
    path('api/', include(router.urls)),
    #path('api-auth/', include('rest_framework.urls', namespace='rest_framework_api'))
]