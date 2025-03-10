from django.urls import path
from .views import SignupView, list_users, ProfileListCreateView, get_logged_in_user

urlpatterns = [
    path("signup/", SignupView.as_view(), name="signup"),  # User Signup 
    path("users/", list_users, name="list_users"),  # List Users 
    path("profiles/", ProfileListCreateView.as_view(), name="profile-list-create"),  # Profiles
    path('user/', get_logged_in_user, name='get_logged_in_user'),
]
