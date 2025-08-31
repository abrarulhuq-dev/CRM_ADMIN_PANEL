from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views


route = DefaultRouter()

route.register(r'customer',views.CustomerViewSet, basename='customer' )


urlpatterns = [
    path('', include(route.urls))
]