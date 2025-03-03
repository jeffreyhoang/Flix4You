from rest_framework import serializers
from .models import History
from movies.models import Movie
from movies.serializers import MovieSerializer

class HistorySerializer(serializers.ModelSerializer):
    movies = MovieSerializer(many=True, read_only=True)

    class Meta:
        model = History
        fields = "__all__"