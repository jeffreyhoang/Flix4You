from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Movie, Genre, Actor, Director
from .serializers import MovieSerializer
from rest_framework.exceptions import NotFound

'''
List movies
- GET /api/movies/
'''
class MovieListView(generics.ListAPIView):
    serializer_class = MovieSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Movie.objects.all()
    
'''
List movies by ID
- GET /api/movies/by-ids/
'''
class MovieByIdsView(generics.ListAPIView):
    serializer_class = MovieSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        movie_ids = self.request.query_params.get('movie_ids')
        movie_ids = [int(id) for id in movie_ids.split(',')]
        return Movie.objects.filter(id__in=movie_ids)


'''
List movies by genre
- GET /api/movies/by-genre
'''
class MovieByGenreView(generics.ListAPIView):
    serializer_class = MovieSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        movie_genre = self.request.query_params.get('movie_genre')
        genre = Genre.objects.get(name=movie_genre)   # Assuming genre is stored by 'name'
        return Movie.objects.filter(genres=genre)
