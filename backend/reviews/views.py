from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Review
from .serializers import ReviewSerializer

class ReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Review.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(profile=self.request.user.profile)   # Attach history list to a user profile