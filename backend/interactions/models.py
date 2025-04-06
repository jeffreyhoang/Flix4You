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
        return f"{self.profile.name} - {self.movie.title}"
    
# Like/Dislike entry
class LikeDislike(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)   # Each like/dislike is linked to a profile
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)   # Each like/dislike is linked to a movie
    is_like = models.BooleanField()   # True for like, false for dislike
    added_at = models.DateTimeField(auto_now_add=True)  # Timestamp when added

    class Meta:
        unique_together = ('profile', 'movie')

    def __str__(self):
        return f"{"Like" if self.is_like else "Dislike"} - {self.profile.name} - {self.movie.title}"
    
# Comment entry
class Comment(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)   # Each comment is linked to a profile
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)   # Each comment is linked to a movie
    comment = models.TextField()
    added_at = models.DateTimeField(auto_now_add=True)  # Timestamp when added

    def __str__(self):
        return f"{self.profile.name} - {self.movie.title} - {self.comment}"
