from django.shortcuts import render
from django.utils.dateparse import parse_datetime
from rest_framework import generics, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from it_helpdesk.api.serializers import TicketSerializer, UserSerializer
from it_helpdesk.tickets.models import Ticket
from it_helpdesk.users.models import User


class TicketsCreateView(generics.CreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        author = get_object_or_404(Ticket, id=self.request.data.get('ticket_id'))
        return serializer.save(author=author)

    # def post(self, request, *args, **kwargs):
    #     ticket = {
    #         'title': request.data['title'],
    #         'description': request.data['description'],
    #         'author': request.data['author'],
    #         'priority': request.data['priority'],
    #         'type': request.data['type'],
    #     }
    #     serializer = TicketSerializer(data=ticket)
    #     if serializer.is_valid():
    #         ticket = serializer.save()
    #         print('ticket---', type(ticket.data))
    #         return Response({
    #             'ticket': ticket,
    #         }, status=status.HTTP_201_CREATED)
    #
    #     return Response({'Некорректные данные': serializer.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TicketsListView(generics.ListAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = (IsAuthenticated,)

class TicketView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = (IsAuthenticated,)

class UserCreateView(generics.CreateAPIView):
    def post(self, request, *args, **kwargs):
        print('request.data', request.data)
        user = {
            'first_name': request.data['first_name'],
            'last_name': request.data['last_name'],
            'username': request.data['username'],
            'password': request.data['password'],
            'role': request.data['role'],
            'date_birth': parse_datetime(request.data['date_birth']),
        }
        print('user', user)
        serializer = UserSerializer(data=user)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)

        return Response({'Некорректные данные': serializer.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class UsersView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

class UsersUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
