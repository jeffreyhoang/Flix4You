from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import History
from .serializers import HistorySerializer

class HistoryListCreateView(generics.ListCreateAPIView):
    serializer_class = HistorySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return History.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(profile=self.request.user.profile)    # Attach history list to a user profile