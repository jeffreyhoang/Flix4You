from django.urls import path
from .views import SignupView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("signup/", SignupView.as_view(), name="signup"),  # User Signup
    path("token/", TokenObtainPairView.as_view(), name="get_token"),  # Login (JWT Auth)
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),  # Refresh Token
]
