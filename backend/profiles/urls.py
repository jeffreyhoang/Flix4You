from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    SignupView, 
    ProfileListCreateView, 
    ProfileRetrieveUpdateDestroyView, 
    get_logged_in_user_view,
    logout_view
)


urlpatterns = [
    # Authentication Endpoints
    path("signup/", SignupView.as_view(), name="signup"),   # User Signup
    path("login/", TokenObtainPairView.as_view(), name="login"),  # JWT Login (Obtain Tokens)
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),  # Refresh Access Token
    path("logout/", logout_view, name="logout"),   # User Logout (Blacklist Refresh Token)

    # User and Profile Endpoints
    path("user/", get_logged_in_user_view, name="get_logged_in_user"),   # Get Authenticated User's Details
    path("profile/", ProfileListCreateView.as_view(), name="profile_list_create"),   # List and Create Profiles
    path("profile/<int:pk>/", ProfileRetrieveUpdateDestroyView.as_view(), name="profile_retrieve_update_destroy"),   # Retrieve, Update, or Delete Profile
]
