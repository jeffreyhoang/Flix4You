from django.urls import path
from .views import MovieListView, MovieByIdsView, MovieByGenreView

urlpatterns = [
    path("movies/", MovieListView.as_view(), name="movie-list"),
    path("movies/by-ids/", MovieByIdsView.as_view(), name="movie-by-id-list"),
    path("movies/by-genre/", MovieByGenreView.as_view(), name="movie-by-genre-list"),
]