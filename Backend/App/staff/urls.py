from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

route = DefaultRouter()

route.register(r'staff', views.StaffViewSet, basename='staff')

urlpatterns = [
    path('', include(route.urls)),
]