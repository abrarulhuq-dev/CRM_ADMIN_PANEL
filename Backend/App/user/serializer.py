from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.password_validation import validate_password

class RegisterSerializer(serializers.ModelSerializer):
    
     password2 = serializers.CharField(write_only = True, required=True)
 
     class Meta:
       model = CustomUser
       fields= ('username', 'email', 'password', 'password2', 'profile_image')
       extra_kwargs = {'password': {'write_only': True}}
    
     def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password" :'Passwords do not match!'})
        return data
    
     def create(self, validated_data):
         validated_data.pop('password2', None)
         
         user = CustomUser.objects.create_user(**validated_data)
         
         return user
