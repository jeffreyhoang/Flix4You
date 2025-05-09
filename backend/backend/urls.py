from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),   # Django Admin Panel
    path("api/", include("profiles.urls")),   # User & Profile Endpoints
    path("api/", include("movies.urls")),   # Movie Endpoints
    path("api/", include("interactions.urls")),   # Interaction Endpoints
]