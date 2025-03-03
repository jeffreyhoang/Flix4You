from django.db import models
from profiles.models import Profile  # Import Profile model
from movies.models import Movie  # Import Movie model


class Watchlist(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)   # Each profile has a watchlist
    movies = models.ManyToManyField(Movie)   # A watchlist contains multiple movies

    def __str__(self):
        return f"Watchlist for {self.profile.name}"
