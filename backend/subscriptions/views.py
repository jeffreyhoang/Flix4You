from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Subscription
from .serializers import SubscriptionSerializer

class SubscriptionListCreateView(generics.ListCreateAPIView):
    serializer_class = SubscriptionSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Subscription.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)   # Attach subscription to a user