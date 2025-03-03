from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Watchlist
from .serializers import WatchlistSerializer

class WatchlistListCreateView(generics.ListCreateAPIView):
    serializer_class = WatchlistSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Watchlist.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(profile=self.request.user.profile)    # Attach watchlist to a user profile