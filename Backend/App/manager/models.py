from django.db import models
from department.models import department

# Create your models here.
class manager(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, unique=True)
    department = models.ForeignKey(department, on_delete=models.SET_NULL, null=True, blank=True, related_name='managers')
    team = models.CharField(max_length=100)
    joined_on = models.DateField(auto_now_add=True)
    status = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name
    

    