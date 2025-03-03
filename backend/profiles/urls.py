from django.urls import path
from .views import SignupView, list_users, ProfileListCreateView

urlpatterns = [
    path("signup/", SignupView.as_view(), name="signup"),  # User Signup 
    path("users/", list_users, name="list_users"),  # List Users 
    path("profiles/", ProfileListCreateView.as_view(), name="profile-list-create"),  # Profiles
]
