from django.db import models
from manager.models import manager

# Create your models here.
class staff(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    manager = models.ForeignKey(manager, on_delete=models.SET_NULL, null=True, blank=True, related_name='staff_members')
    skill = models.CharField(max_length=100)
    joined_on = models.DateField(auto_now_add=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name