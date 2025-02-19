from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer

class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Require authentication
def list_users(request):
    users = User.objects.all().values("username", "email")
    return Response(list(users))