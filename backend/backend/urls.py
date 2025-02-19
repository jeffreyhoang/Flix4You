from django.contrib import admin
from django.urls import path, include
from .views import list_users

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),  # Includes all API routes from `api/urls.py`
    path('api/users/', list_users, name='list_users'),
]
