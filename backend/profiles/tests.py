from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import Profile
from django.db.utils import IntegrityError


class TestModels(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="username", password="password")

    def test_profile_creation(self):
        profile = Profile.objects.create(user=self.user, name="name", avatar="https://example.com/avatar.png")
        self.assertEqual(profile.name, "name")
        self.assertEqual(profile.avatar, "https://example.com/avatar.png")
        self.assertEqual(profile.user.username, "username")
        self.assertTrue(profile.user.check_password("password"))

    def test_str_method(self):
        profile = Profile.objects.create(user=self.user, name="name", avatar="https://example.com/avatar.png")
        self.assertEqual(str(profile), "Profile: name (User: username)")

    def test_unique_constraint(self):
        Profile.objects.create(user=self.user, name='Main')
        with self.assertRaises(IntegrityError):
            Profile.objects.create(user=self.user, name='Main')  # Same user and name should fail

    def test_user_can_have_multiple_profiles(self):
        Profile.objects.create(user=self.user, name="first")
        Profile.objects.create(user=self.user, name="second")
        self.assertEqual(Profile.objects.filter(user=self.user).count(), 2)


class TestViews(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="username", password="password")
        self.refresh = RefreshToken.for_user(self.user)
        self.access_token = str(self.refresh.access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.access_token}")

    # Tests for SignupView
    def test_signup_view(self):
        response = self.client.post("/api/signup/", {
            "username": "username",
            "password": "password"
        })
        self.assertEqual(response.status_code, 201)
        self.assertEqual(User.objects.filter(username="password").count(), 1)
    
    # Tests for ProfileListCreateView
    def test_create_profiles(self):
        response = self.client.post("/api/profiles", {
            "name": "name"
        })
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Profile.objects.count(), 1)
        self.assertEqual(Profile.objects.first().name, "name")

    def test_list_profiles(self):
        Profile.objects.create(user=self.user, name="name")
        response = self.client.get("/api/profiles/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(Profile.objects.first().name, "name")

    def test_profiles_limit(self):
        for i in range (5):
            Profile.objects.create(user=self.user, name=f"Profile {i}")
        response = self.client.post("/api/profiles/", {"name": "extra"})
        self.assertEqual(response.status_code, 400)
        self.assertIn("You can only have up to 5 profiles.", str(response.data))

    # Tests for ProfileRetrieveUpdateDestroyView
    def test_retrieve_profile(self):
        profile = Profile.objects.create(user=self.user, name="name")
        response = self.client.get(f"/api/profiles/{profile.id}/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["name"], "name")
        self.assertEqual(response.data["id"], profile.id)

    def test_update_profile(self):
        profile = Profile.objects.create(user=self.user, name="name")
        response = self.client.put(f"/api/profiles/{profile.id}/", {
            "name": "new_name"
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(profile.name, "new_name")
    
    def test_destroy_profile(self):
        profile = Profile.objects.create(user=self.user, name="name")
        response = self.client.delete(f"/api/profiles/{profile.id}")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(Profile.objects.count(), 0)

    # Tests for get_logged_in_user_view
    def test_get_logged_in_user(self):
        response = self.client.get("/api/user/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.user.username, "username")

    # Tests for logout_view
    def test_logout_view(self):
        response = self.client.post("/api/logout/",  {
            "refresh": str(self.refresh)
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn("Successfully logged out", response.data["message"])
