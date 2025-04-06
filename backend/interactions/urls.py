from django.urls import path
from .views import ( WatchlistListCreateView, 
                     WatchlistRetrieveDestroyView, 
                     LikeDislikeCreateView, 
                     LikeDislikeRetrieveUpdateDestroyView,
                     CommentCreateView,
                     CommentRetrieveUpdateDestroyView )

urlpatterns = [
    # Watchlist url endpoints
    path("watchlist/profile/<int:profile_id>/", WatchlistListCreateView.as_view(), name="watchlist-list-create"),
    path("watchlist/profile/<int:profile_id>/movie/<int:movie_id>/", WatchlistRetrieveDestroyView.as_view(), name="watchlist-retrieve-destroy"),

    # Like/Dislike url endpoints
    path("likedislike/profile/<int:profile_id>/", LikeDislikeCreateView.as_view(), name="like-dislike-create"),
    path("likedislike/profile/<int:profile_id>/movie/<int:movie_id>/", LikeDislikeRetrieveUpdateDestroyView.as_view(), name="like-dislike-retrive-update-destroy"),

    # Comment url endpoints
    path("comment/profile/<int:profile_id>/", CommentCreateView.as_view(), name="comment-create"),
    path("comment/profile/<int:profile_id>/movie/<int:movie_id>/", CommentRetrieveUpdateDestroyView.as_view(), name="comment-retrieve-update-destroy"),
]