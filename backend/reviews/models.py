from django.db import models
from profiles.models import Profile  # Import Profile model
from movies.models import Movie  # Import Movie model

class Review(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)   # Each review is written by a profile
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)   # Each review is associated with a specific movie
    rating = models.PositiveIntegerField()   # Rating (1-5 scale)
    comment = models.TextField(blank=True, null=True)   # Optional comment
    created_at = models.DateTimeField(auto_now_add=True)   # When review was created

    def __str__(self):
        return f"{self.profile.name} - {self.movie.title} ({self.rating}/5)"