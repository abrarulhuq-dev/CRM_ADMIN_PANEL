from django.urls import path
from . import views


urlpatterns = [
    path('', views.get_departments, name='get_departments'),
    path('add/', views.add_department, name='add_department'),
]