from rest_framework import serializers
from .models import Review
from movies.models import Movie
from movies.serializers import MovieSerializer

class ReviewSerializer(serializers.ModelSerializer):
    profile = serializers.StringRelatedField()   # Display profile name instad of ID
    movie = serializers.StringRelatedField()   # Display movie title instead of ID

    class Meta:
        model = Review
        fields = "__all__"
