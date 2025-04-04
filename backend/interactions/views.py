from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .serializers import WatchlistSerializer, LikeDislikeSerializer
from .models import Watchlist, LikeDislike

'''
List and create watchlist movies
- GET /api/watchlist/profile/{profile_id}/
- POST /api/watchlist/profile/{profile_id}/
'''
class WatchlistListCreateView(generics.ListCreateAPIView):
    serializer_class = WatchlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        profile_id = self.kwargs["profile_id"]
        return Watchlist.objects.filter(profile_id=profile_id)
    
    def perform_create(self, serializer):
        profile_id = self.kwargs["profile_id"]
        serializer.save(profile_id=profile_id)

'''
Retrieve or delete a single watchlist movie
- GET /api/watchlist/profile/{profile_id}/movie/{movie_id}/
- DELETE /api/watchlist/profile/{profile_id}/movie/{movie_id}/
'''
class WatchlistRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    serializer_class = WatchlistSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        profile_id = self.kwargs["profile_id"]
        movie_id = self.kwargs["movie_id"]
        return get_object_or_404(Watchlist, profile_id=profile_id, movie_id=movie_id)



'''
Create a single like/dislike
- POST /api/likedislike/profile/{profile_id}/
'''
class LikeDislikeCreateView(generics.CreateAPIView):
    serializer_class = LikeDislikeSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        profile_id = self.kwargs["profile_id"]
        serializer.save(profile_id=profile_id)

'''
Retrieve or delete a single like/dislike
- GET /api/likedislike/profile/{profile_id}/movie/{movie_id}/
- PUT /api/likedislike/profile/{profile_id}/movie/{movie_id}/
- DELETE /api/likedislike/profile/{profile_id}/movie/{movie_id}/
'''
class LikeDislikeRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LikeDislikeSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        profile_id = self.kwargs["profile_id"]
        movie_id = self.kwargs["movie_id"]
        return get_object_or_404(LikeDislike, profile_id=profile_id, movie_id=movie_id)