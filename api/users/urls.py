from django.urls import path, include
from .views import AuthorView, ProfileView
from rest_framework import routers
router = routers.DefaultRouter()

router.register('', AuthorView)
router.register('profile', ProfileView)

urlpatterns = [
    path('', include(router.urls))
]
