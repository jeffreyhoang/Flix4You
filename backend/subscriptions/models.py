from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Subscription(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)   # Each user has ONE subscription
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField(null=True, blank=True)   # Optional end date

    def __str__(self):
        return f"Subscription for {self.user.username} (Ends: {self.end_date})"