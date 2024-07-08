from django.urls import path

from rest_framework.routers import DefaultRouter

from it_helpdesk.api import views

router = DefaultRouter(trailing_slash=True)

urlpatterns = router.urls

urlpatterns.extend([
    path('signup/', views.UserCreateView.as_view()),
    path('users/', views.UsersView.as_view()),
    path('tickets/', views.TicketsListView.as_view()),
    path('newticket/', views.TicketsCreateView.as_view()),
    path('ticket/<int:pk>/', views.TicketView.as_view()),
    path('users/<int:pk>/', views.UsersUpdateDeleteView.as_view()),
])
