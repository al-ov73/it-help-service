from rest_framework import serializers

from it_helpdesk.tickets.models import Ticket
from it_helpdesk.users.models import User


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
    
    def create(self, validated_data):
        print('validated_data', validated_data)
        user = User.objects.create(
            username=validated_data['username'],
            role=validated_data['role'],
            date_birth=validated_data['date_birth'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
