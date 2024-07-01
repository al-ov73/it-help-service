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
