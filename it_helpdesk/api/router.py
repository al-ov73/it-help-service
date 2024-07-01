from django.urls import path

from rest_framework.routers import DefaultRouter

from it_helpdesk.api.views import UsersUpdateDeleteView, \
    TicketsViewSet, UserCreateView, UsersView

router = DefaultRouter(trailing_slash=True)

urlpatterns = router.urls

urlpatterns.extend([
    path('signup/', UserCreateView.as_view()),
    path('users/', UsersView.as_view()),
    path('users/<int:pk>/', UsersUpdateDeleteView.as_view()),

    path('tickets/', TicketsViewSet.as_view({
        'get': 'list',
        'post': 'create',
    })),
    path('tickets/<int:pk>/', TicketsViewSet.as_view({
        'get': 'retrieve',
        'patch': 'update',
        'delete': 'destroy',
    })),
])
