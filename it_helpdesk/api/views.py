from django.shortcuts import render
from rest_framework import generics, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from it_helpdesk.api.serializers import TicketSerializer, UserSerializer
from it_helpdesk.tickets.models import Ticket
from it_helpdesk.users.models import User


class TicketsViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class UserCreateView(generics.CreateAPIView):
    # queryset = User.objects.all()
    # serializer_class = UserSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            print('user', user)
            refresh = RefreshToken.for_user(user) # Создание Refesh и Access
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token), # Отправка на клиент
            }, status=status.HTTP_201_CREATED)
    
    
    # def post(self, request):
    #     serializer = UserSerializer(data=request.data)
    #     if serializer.is_valid():
    #         user = serializer.save()
    #         print('user', user)
    #         refresh = RefreshToken.for_user(user) # Создание Refesh и Access
    #         refresh.payload.update({    # Полезная информация в самом токене
    #             'user_id': user.id,
    #             'username': user.username
    #         })
    #         return Response({
    #             'refresh': str(refresh),
    #             'access': str(refresh.access_token), # Отправка на клиент
    #         }, status=status.HTTP_201_CREATED)

class UsersView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

class UsersUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
