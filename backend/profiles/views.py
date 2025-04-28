from rest_framework import generics, serializers
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Profile
from .serializers import UserSerializer, ProfileSerializer
from rest_framework_simplejwt.tokens import RefreshToken

'''
Create a user
- POST /api/signup/
'''
class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

'''
List & create profiles
- GET /api/profile/
- POST /api/profile/
'''
class ProfileListCreateView(generics.ListCreateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        profile_count = Profile.objects.filter(user=self.request.user).count()

        if profile_count >= 5:
            raise serializers.ValidationError("You can only have up to 5 profiles.")

        serializer.save(user=self.request.user)   # Attach profile to logged-in user

'''
Retrieve, update, and delete a single profile
- GET /api/profile/{id}
- PUT /api/profile/{id}
- DELETE /api/profile/{id}
'''
class ProfileRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)

'''
Retrieve the authenticated user's details
- GET /api/user/
'''
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_logged_in_user_view(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name
    } )

'''
Logs out the user by blacklisting the token
- POST /api/logout/
'''
@api_view(['POST'])
@permission_classes([])
def logout_view(request):
    try:
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"message": "Successfully logged out"}, status=200)
    except Exception as e:
        return Response({"message": "Token invalid or already expired — treated as logged out."}, status=200)


