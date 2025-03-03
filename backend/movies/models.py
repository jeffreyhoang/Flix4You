from django.db import models

class Actor(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Director(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Movie(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    genre = models.CharField(max_length=100)
    release_date = models.DateField()
    duration = models.IntegerField()    # Duration in minutes
    actors = models.ManyToManyField(Actor)  # A movie contains multiple actors
    directors = models.ManyToManyField(Director)    # A movie contains multiple directors
    rating = models.FloatField(default=0.0) # Average rating (1-5 scale)
    poster_url = models.URLField(null=True, blank=True) # Movie poster image
    trailer_url = models.URLField(null=True, blank=True)    # Trailer video URL

    def __str__(self):
        return self.title