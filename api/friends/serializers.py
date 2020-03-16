from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from friends.models import Friend

class FriendReadOnlySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Friend
        fields = ('id', 'receiver', 'requester', 'rec_follow_req', 'req_follow_rec', 'not_read')
        read_only_fields = ('receiver', 'requester', 'rec_follow_req', 'req_follow_rec', 'not_read')

class FriendReceiverSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Friend
        fields = ('id', 'receiver', 'requester', 'rec_follow_req', 'req_follow_rec', 'not_read')
        read_only_fields = ('receiver', 'receiver', 'req_follow_rec')

    #     validators = [
    #         UniqueTogetherValidator(
    #             queryset=Friend.objects.all(),
    #             fields=['receiver', 'requester']
    #         )
    #     ]

    # def validate(self, data):
    #     """
    #     enforce receiver field and requester field have different values
    #     """
    #     if data['receiver'] == data['requester']:
    #         raise serializers.ValidationError("receiver and requester should not be same")
    #     return data

class FriendRequesterSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Friend
        fields = ('id', 'receiver', 'requester', 'rec_follow_req', 'req_follow_rec', 'not_read')
        read_only_fields = ('rec_follow_req', 'not_read')

        validators = [
            UniqueTogetherValidator(
                queryset=Friend.objects.all(),
                fields=['receiver', 'requester']
            )
        ]

    def validate(self, data):
        """
        enforce receiver field and requester field have different values
        """
        if data['receiver'] == data['requester']:
            raise serializers.ValidationError("receiver and requester should not be same")
        return data