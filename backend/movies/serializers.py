from rest_framework import serializers
from .models import Movie, Actor, Director

class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = "__all__"

class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = "__all__"

class MovieSerializer(serializers.ModelSerializer):
    actors = ActorSerializer(many=True)
    directors = DirectorSerializer(many=True)

    class Meta:
        model = Movie
        fields = "__all__"
