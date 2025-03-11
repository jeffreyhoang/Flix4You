from django.contrib import admin
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "name", "created_at")
    search_fields = ("name", "user__username")
    list_filter = ("created_at",)
