from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from users.serializers import SignupSerializer
from .models import Profiles


class ProfilesView(RetrieveAPIView):

    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def get(self, request):
        try:
            user_profile = Profiles.objects.get(user=request.user)
            status_code = status.HTTP_200_OK
            response = {
                'success': 'true',
                'status code': status_code,
                'message': 'User profile fetched successfully',
                'data': [{
                    'email': user_profile.a_email,
                    'firstname': user_profile.a_firstname,
                    'lastname': user_profile.a_lastname,
                    'description': user_profile.a_description,
                    'gender': user_profile.a_gender,
                }]
            }

        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': 'false',
                'status code': status_code,
                'message': 'Author does not exists',
                'error': str(e)
            }
        return Response(response, status=status_code)
