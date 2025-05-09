from django.db import models

class Genre(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name
    
class Actor(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

class Director(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

class Movie(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    release_date = models.DateField()
    duration = models.IntegerField()    # Duration in minutes
    actors = models.ManyToManyField(Actor)  # A movie contains multiple actors
    directors = models.ManyToManyField(Director)    # A movie contains multiple directors
    genres = models.ManyToManyField(Genre)   # A movie contains multiple genres
    rating = models.TextField(max_length=5)   # R, PG, PG-13, etc.
    imdbRating = models.FloatField(default=0.0)   # IMDb Rating (1-10)
    poster_url = models.URLField(null=True, blank=True) # Movie poster image
    trailer_url = models.URLField(null=True, blank=True)    # Trailer video URL
    movie_url = models.URLField(null=True, blank=True)   # Movie URL

    def __str__(self):
        return self.title