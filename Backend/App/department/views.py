from rest_framework.response import Response
from rest_framework import status, viewsets
from .models import department
from .serializer import DepartmentSerializer

# Create your views here.
class DepartmentViewSet(viewsets.ModelViewSet):
    
    queryset = department.objects.all()
    serializer_class = DepartmentSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({
                    'success' : True,
                    "message": "Department created successfully ",
                    "data": serializer.data
                }, status=status.HTTP_201_CREATED, headers=headers)
        
    def list(self, request, *args, **kwargs):
      try: 
           queryset = self.get_queryset()          
           if not queryset.exists():
               return Response({'message': "No Department found."},status=status.HTTP_404_NOT_FOUND )
           serializer = self.serializer_class(queryset, many=True)
           return Response(serializer.data, status=status.HTTP_200_OK)
      except Exception as e:
          return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)  
        if serializer.is_valid(): 
            serializer.save() 
            return Response({ 
                             "success": True, 
                             "message": "Manager updated successfully", 
                             "data": serializer.data 
                             }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            "success": True,
            "message": "Department deleted successfully"
        }, status=status.HTTP_200_OK)
    