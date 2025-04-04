from rest_framework import serializers
from .models import Watchlist, LikeDislike

class WatchlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Watchlist
        fields = ['id', 'movie', 'added_at']  # exclude profile

class LikeDislikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikeDislike
        fields = ['id', 'movie', 'is_like', 'added_at']
