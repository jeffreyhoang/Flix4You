from rest_framework import serializers
from .models import Watchlist
from movies.models import Movie
from movies.serializers import MovieSerializer

class WatchlistSerializer(serializers.ModelSerializer):
    movies = MovieSerializer(many=True, read_only=True)

    class Meta:
        model = Watchlist
        fields = "__all__"