from django.conf.urls import url, include
from rest_framework import routers
from users.views import UserViewSet
from users.views import LogInAPIView
from users.views import CurrentAPIView

router = routers.DefaultRouter()
router.register(r'author', UserViewSet, basename="user")

urlpatterns = [
    url(r'^', include(router.urls)),
    #url(r'^current', UserViewSet.as_view({"get": "current_author"})),
    url(r'^login', LogInAPIView.as_view()),
    url(r'^currentuser/', CurrentAPIView.as_view()),
    url(r'^account/', include('allauth.urls')),
]