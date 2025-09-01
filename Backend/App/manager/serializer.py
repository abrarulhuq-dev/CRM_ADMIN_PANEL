from rest_framework import serializers
from .models import manager

class ManagerSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)
    class Meta:
        model = manager
        fields = ['id', 'name', 'email', 'phone', 'team', 'status', 'joined_on', 'department', 'department_name']