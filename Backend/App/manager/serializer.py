from rest_framework import serializers
from .models import manager

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = manager
        fields = '__all__'