from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Profile
from .serializers import UserSerializer, ProfileSerializer

# User Signup (Moved from api/views.py)
class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

# List All Users (Moved from api/views.py)
@api_view(['GET'])
def list_users(request):
    users = User.objects.all().values("username", "email")
    return Response(list(users))

# List & Create Profiles (Profiles now handle users)
class ProfileListCreateView(generics.ListCreateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]   # change to 'IsAuthenticated' if you want profiles to be private during deployment

    def get_queryset(self):
        return Profile.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Attach profile to logged-in user
