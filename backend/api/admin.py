from django.contrib import admin
from .models import Director, Actor, Movie, UserProfile, Watchlist, History, Ratings

# Register Models
admin.site.register(Director)
admin.site.register(Actor)
admin.site.register(Movie)
admin.site.register(UserProfile)
admin.site.register(Watchlist)
admin.site.register(History)
admin.site.register(Ratings)
