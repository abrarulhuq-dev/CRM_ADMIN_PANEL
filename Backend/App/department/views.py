from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status 
from .models import department
from .serializer import DepartmentSerializer

# Create your views here.

@api_view(['GET'])
def get_departments(request):
    try:
        data = department.objects.all()
        if not data:
            return Response({"message": "No departments found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = DepartmentSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    


@api_view(['POST'])
def add_department(request):
    data = request.data
    serializer = DepartmentSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({
                    'success' : True,
                    "message": "Department created successfully ",
                    "data": serializer.data
                }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)