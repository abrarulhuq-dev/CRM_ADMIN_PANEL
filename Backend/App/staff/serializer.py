from rest_framework import serializers
from .models import staff


class StaffSerializer(serializers.ModelSerializer):
    
     manager_name = serializers.CharField(source='manager.name', read_only=True)
     class Meta:
        model = staff
        fields = ['id', 'name', 'email', 'phone', 'skill', 'status', 'joined_on', 'manager', 'manager_name']