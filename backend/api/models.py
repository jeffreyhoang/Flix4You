from django.db import models
from django.contrib.auth.models import User  # Use Django's built-in User model

# Director Model
class Director(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    dob = models.DateField()  # Date of Birth

    def __str__(self):
        return self.name

# Actor Model
class Actor(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

# Movie Model
class Movie(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    year = models.IntegerField()
    description = models.TextField()
    genre = models.CharField(max_length=100)
    length = models.FloatField()  # Movie duration in hours or minutes
    cast = models.ManyToManyField(Actor)  # Many actors in a movie
    director = models.ForeignKey(Director, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

# User Profile (Extending Django's User Model)
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    favorite_movie = models.ForeignKey(Movie, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.user.username

# Watchlist Model
class Watchlist(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    date_added = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s Watchlist - {self.movie.name}"

# History Model (Tracks User Progress)
class History(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    movie_progress = models.IntegerField()  # Store progress in percentage or timestamp
    date_added = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} watched {self.movie.name}"

# Ratings Model
class Ratings(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    num_likes = models.IntegerField(default=0)
    num_dislikes = models.IntegerField(default=0)
    overall_rating = models.FloatField(default=0.0)

    def __str__(self):
        return f"Rating for {self.movie.name} by {self.user.username}"
