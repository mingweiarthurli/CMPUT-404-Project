from django.conf.urls import url, include
from rest_framework import routers
from hosts.views import HostViewSet

router = routers.DefaultRouter()
router.register(r'host', HostViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]