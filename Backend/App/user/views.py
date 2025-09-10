from rest_framework import viewsets,status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import RegisterSerializer
from .models import CustomUser
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny

class RegisterView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception = True): # checking the validation or any error message is invalid
            user = serializer.save()
            return Response( {"message": "User registered successfully",
                "user": {
                "username": user.username,
                "email": user.email,
                "profile_image": user.profile_image.url if user.profile_image else None
                 }}, status=status.HTTP_201_CREATED)
            
class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({"error": "plaese provide username and password"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(username=username, password=password)
        
        if user : 
            refresh = RefreshToken.for_user(user)
            return Response({"message": "Login sucessful",
                "user": {
                    "username": user.username,
                    "email": user.email,
                },
                "token": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token)
                }}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        
class ProfileView(APIView):
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        serializer = RegisterSerializer(user)
        return Response({"user": serializer.data,
            "username": user.username,
            "email": user.email,
            "profile_image": user.profile_image.url if user.profile_image else None
        }, status=status.HTTP_200_OK)
        
    
    def put(self, request):
        user = request.user    
        serializer = RegisterSerializer(user, data={**request.data, **request.FILES} , partial =True )
        if serializer.is_valid():
            serializer.save()
            user.refresh_from_db()
            return Response({ "message" : "Update profile successful",
                              "username": user.username,
                              "email": user.email,
                              "profile_image": user.profile_image.url if user.profile_image else None},
                            status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        
    