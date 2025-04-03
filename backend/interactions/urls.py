from django.urls import path
from .views import WatchlistListCreateView, WatchlistRetrieveDestroyView

urlpatterns = [
    path("watchlist/profile/<int:profile_id>/", WatchlistListCreateView.as_view(), name="watchlist-list-create"),
    path("watchlist/profile/<int:profile_id>/movie/<int:movie_id>/", WatchlistRetrieveDestroyView.as_view(), name="watchlist-retrieve-destroy"),
]