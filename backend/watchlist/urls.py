from django.urls import path
from .views import WatchlistListCreateView

urlpatterns = [
    path("watchlist/", WatchlistListCreateView.as_view(), name="watchlist-list-create"),
]