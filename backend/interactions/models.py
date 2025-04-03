from django.db import models
from movies.models import Movie;
from profiles.models import Profile

# Watchlist entry
class Watchlist(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)   # Each watchlist entry is linked to a profile
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)   # Each watchlist entry is linked to a movie
    added_at = models.DateTimeField(auto_now_add=True)  # Timestamp when added

    class Meta:
        unique_together = ('profile', 'movie')
        
    def __str__(self):
        return f"Profile: {self.profile.name} (movie: {self.movie.title})"
