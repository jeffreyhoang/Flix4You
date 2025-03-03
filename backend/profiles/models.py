from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)   # One user → multiple profiles
    name = models.CharField(max_length=100)
    avatar = models.URLField(null=True, blank=True)  # Optional profile picture
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp when created

    def __str__(self):
        return f"Profile: {self.name} (User: {self.user.username})"
