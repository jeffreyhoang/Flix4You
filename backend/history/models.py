from django.db import models
from profiles.models import Profile  # Import Profile model
from movies.models import Movie  # Import Movie model

class History(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)   # Each profile has ONE history list
    movies = models.ManyToManyField(Movie)   # A history list contains multiple movies
    watched_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"History list for {self.profile.name}"