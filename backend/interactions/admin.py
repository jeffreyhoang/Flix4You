from django.contrib import admin
from .models import Watchlist, LikeDislike, Comment

admin.site.register(Watchlist)
admin.site.register(LikeDislike)
admin.site.register(Comment)
