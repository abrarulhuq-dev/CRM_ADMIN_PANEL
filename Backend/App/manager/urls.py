from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

route = DefaultRouter()
route.register(r'manager', views.ManagerViewSet, basename='manager')

urlpatterns = [
  
   path('', include(route.urls)),
]