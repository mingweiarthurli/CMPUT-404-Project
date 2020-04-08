'''
Please NOTE:
    This permission file can only be used to restrict actions of users on the specifed object.
    If you want to only show specific objects as result to users, please use filters in the view.
    These permissions WOULD NOT BE EFFECTIVE to the filtered results return by queryset in the view.

    Which means: these permissions CAN ONLY REFUSE CERTAIN USER TAKE CERTAIN ACTIONS ON CERTAIN OBJECT,
    BUT CANNOT FILTER OBJECTS AS "GET" RESULT.
'''

from rest_framework import permissions
from django.db.models import Q

class IsAdminOrReadOnly(permissions.BasePermission):
    '''
    Custom permission.
    Only the author of posts can edit or delete them.
    '''

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True
        elif request.user.userType == "admin":
            return True
        else:
            return False