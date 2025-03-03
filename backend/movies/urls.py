from django.urls import path
from .views import MovieListCreateView, MovieDetailView

urlpatterns = [
    path("movies/", MovieListCreateView.as_view(), name="movie-list-create"),
    path("movies/<int:pk>/", MovieDetailView.as_view(), name="movie-detail"),
]