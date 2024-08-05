from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from it_helpdesk.models import Ticket, User
from it_helpdesk.api.serializers import TicketSerializer, TicketListSerializer, UserSerializer

IT_ROLES = ['IT', 'MG']


class TicketsListCreateView(generics.ListCreateAPIView):
    queryset = Ticket.objects.select_related("author").select_related("assigned").all().order_by('-id')
    serializer_class = TicketListSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        serializer = TicketSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'ticket': serializer.data,
            }, status=status.HTTP_201_CREATED)
        return Response({'Некорректные данные': serializer.errors},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get_queryset(self):
        if self.request.user.role in IT_ROLES:
            return self.queryset.all().order_by('-id')
        owner_queryset = self.queryset.filter(author=self.request.user)
        return owner_queryset.order_by('-id')


class TicketView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.select_related("author").select_related("assigned").all()
    serializer_class = TicketSerializer
    permission_classes = (IsAuthenticated,)


class UserCreateView(generics.CreateAPIView):

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)

        return Response({'Некорректные данные': serializer.errors},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UsersView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)


class UsersUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
