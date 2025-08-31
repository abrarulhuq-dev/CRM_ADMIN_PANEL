from django.db import models

# Create your models here.
class customer(models.Model):
    name = models.CharField(max_length=100)
    profile = models.ImageField(upload_to='profiles/', null=True, blank=True)
    email = models.EmailField(unique=True)
    BOD = models.DateField()
    phone = models.CharField(max_length=15, unique=True)
    gender = models.CharField(max_length=10)
    status = models.CharField(max_length=20, default='New')
    Added_on = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name    