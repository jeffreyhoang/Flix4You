from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),   # Django Admin Panel
    path("api/", include("profiles.urls")),   # User & Profile Endpoints
    path("api/", include("api.urls")),   # Authentication Endpoints (JWT)
    path("api/", include("movies.urls")),   # Movie Endpoints
    path("api/", include("watchlist.urls")),   # Watchlist Endpoints
    path("api/", include("history.urls")),   # History Endpoints
    path("api/", include("reviews.urls")),   # Reviews Endpoints
    path("api/", include("subscriptions.urls")),   # Subscriptions Endpoints
]
