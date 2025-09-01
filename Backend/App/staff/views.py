from rest_framework.response import Response
from rest_framework import status, viewsets
from .models import staff
from .serializer import StaffSerializer



# Create your views here.

class StaffViewSet(viewsets.ModelViewSet):
    
    queryset = staff.objects.all()
    serializer_class = StaffSerializer
    
    def list(self, *args, **kwargs):
        try:
            queryset = self.get_queryset()          
            if not queryset.exists():
                return Response({"message": "No staffs found."}, status=status.HTTP_404_NOT_FOUND)
            serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                    'success' : True,
                    "message": "Staff created successfully ",
                    "data": serializer.data
                }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False) 
        instance = self.get_object()
        serializer = self.serializer_class(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response({
                    'success' : True,
                    "message": "Staff updated successfully ",
                    "data": serializer.data
                }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({
                    'success' : True,
                    "message": "Staff deleted successfully "
                }, status=status.HTTP_204_NO_CONTENT)
        
        