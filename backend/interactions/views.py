from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Count, Q
from django.shortcuts import get_object_or_404
from .serializers import WatchlistSerializer, LikeDislikeSerializer, CommentSerializer, WatchHistorySerializer
from .models import Watchlist, LikeDislike, Comment, WatchHistory

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
Retrieve, update, or delete a single like/dislike
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

'''
Retrieves the number of likes and dislikes of a movie
- GET /api/likedislike/movie/{movie_id}/
'''
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def movie_likes_view(request, movie_id):
    data = (
        LikeDislike.objects
        .filter(movie_id=movie_id)
        .aggregate(
            like_count=Count('id', filter=Q(is_like=True)),
            dislike_count=Count('id', filter=Q(is_like=False))
        )
    )
    return Response({
        "movie_id": movie_id,
        "like_count": data['like_count'],
        "dislike_count": data['dislike_count']
    })

'''
Create a single comment
- POST /api/comment/profile/{profile_id}
'''
class CommentCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        profile_id = self.kwargs["profile_id"]
        serializer.save(profile_id=profile_id)

'''
Retrieve, update, or delete a single comment
- GET /api/comment/profile/{profile_id}/movie/{movie_id}/
- PUT /api/comment/profile/{profile_id}/movie/{movie_id}/
- DELETE /api/comment/profile/{profile_id}/movie/{movie_id}/
'''
class CommentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        profile_id = self.kwargs["profile_id"]
        movie_id = self.kwargs["movie_id"]
        return get_object_or_404(Comment, profile_id=profile_id, movie_id=movie_id)
    
'''
List all comments of a movie
- GET /api/coment/movie/{movie_id}/
'''
class CommentListView(generics.ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        return Comment.objects.filter(movie_id=movie_id)
