from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LoginView, ProfileView 


route = DefaultRouter()
route.register(r'register', RegisterView, basename='register')


urlpatterns = [
    path('', include(route.urls)),
    path('login/', LoginView.as_view(), name="login"),
    path('profile/', ProfileView.as_view(), name= "profile"),
]