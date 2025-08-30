from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import department
from .serializer import DepartmentSerializer

# Create your views here.

@api_view(['GET'])
def get_departments(request):
    data = department.objects.all()
    serializer = DepartmentSerializer(data, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_department(request):
    data = request.data
    serializer = DepartmentSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)