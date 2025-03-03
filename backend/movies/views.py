from rest_framework import generics
from .models import Movie
from .serializers import MovieSerializer

# View to list all movies and allow adding new ones
class MovieListCreateView(generics.ListCreateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

# View to retrieve, update, or delete a specific movie
class MovieDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
