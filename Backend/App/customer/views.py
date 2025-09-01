from rest_framework import status, viewsets
from rest_framework.response import Response
from .models import customer
from .serializer import CustomerSerializer

# Create your views here.

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = customer.objects.all()
    serializer_class = CustomerSerializer
    
    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'success': True,
                'message' : 'customer created successfull',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def list(self, *args, **kwargs):
        try: 
            queryset = self.get_queryset()          
            if not queryset.exists():
                return Response({'message': "No Customer found."},status=status.HTTP_404_NOT_FOUND )
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
                             "message": "Customer updated successfully", 
                             "data": serializer.data 
                             }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            "success": True,
            "message": "Custmoer deleted successfully"
        }, status=status.HTTP_200_OK)