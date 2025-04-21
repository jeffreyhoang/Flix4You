from django.test import TestCase
from rest_framework.test import APITestCase
from movies.models import Movie
from profiles.models import Profile
from django.contrib.auth.models import User
from .models import Watchlist, LikeDislike, Comment
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import date
from django.db.utils import IntegrityError

class TestModels(TestCase):
    def setUp(self):
        user = User.objects.create_user(username="username", password="password")
        self.profile = Profile.objects.create(user=user, name="name")
        self.movie = Movie.objects.create(
            title="Test Movie",
            description="Description",
            release_date=date(2023, 1, 1),
            duration=120,
            rating="PG",
            imdbRating=7.5
        )

    # Creation tests
    def test_watchlist_creation(self):
        watchlist = Watchlist.objects.create(profile=self.profile, movie=self.movie)
        self.assertEqual(watchlist.profile, self.profile)
        self.assertEqual(watchlist.movie, self.movie)

    def test_like_dislike_creation(self):
        like = LikeDislike.objects.create(profile=self.profile, movie=self.movie, is_like=True)
        self.assertEqual(like.profile, self.profile)
        self.assertEqual(like.movie, self.movie)
        self.assertEqual(like.is_like, True)

    def test_comment_creation(self):
        comment = Comment.objects.create(profile=self.profile, movie=self.movie, comment="Test comment.")
        self.assertEqual(comment.profile, self.profile)
        self.assertEqual(comment.movie, self.movie)
        self.assertEqual(comment.comment, "Test comment.")

    # String method tests
    def test_str_methods(self):
        watchlist = Watchlist.objects.create(profile=self.profile, movie=self.movie)
        like = LikeDislike.objects.create(profile=self.profile, movie=self.movie, is_like=True)
        comment = Comment.objects.create(profile=self.profile, movie=self.movie, comment="Test comment.")
        self.assertEqual(str(watchlist), "name - Test Movie")
        self.assertEqual(str(like), "Like - name - Test Movie")
        self.assertEqual(str(comment), "name - Test Movie - Test comment.")

    # Unique constraint tests
    def test_watchlist_unique_constraint(self):
        Watchlist.objects.create(profile=self.profile, movie=self.movie)
        with self.assertRaises(IntegrityError):
            Watchlist.objects.create(profile=self.profile, movie=self.movie)

    def test_like_dislike_unique_constraints(self):
        LikeDislike.objects.create(profile=self.profile, movie=self.movie, is_like=True)
        with self.assertRaises(IntegrityError):
            LikeDislike.objects.create(profile=self.profile, movie=self.movie, is_like=False)

class TestViews(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="username", password="password")
        self.refresh = RefreshToken.for_user(self.user)
        self.access_token = str(self.refresh.access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.access_token}")

        self.profile = Profile.objects.create(user=self.user, name="name")
        self.movie = Movie.objects.create(
            title="Movie 1",
            description="Test movie",
            release_date=date(2023, 1, 1),
            duration=120,
            rating="PG",
            imdbRating=7.5
        )

    # Watchlist tests
    def test_create_watchlist_entry(self):
        response = self.client.post(f"/api/watchlist/profile/{self.profile.id}/", {"movie": self.movie.id})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Watchlist.objects.count(), 1)

    def test_retrive_watchlist_entry(self):
        Watchlist.objects.create(profile=self.profile, movie=self.movie)
        response = self.client.get(f"/api/watchlist/profile/{self.profile.id}/movie/{self.movie.id}/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["movie"], self.movie.id)

    def test_delete_watchlist_entry(self):
        Watchlist.objects.create(profile=self.profile, movie=self.movie)
        response = self.client.delete(f"/api/watchlist/profile/{self.profile.id}/movie/{self.movie.id}/")
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Watchlist.objects.count(), 0)


    # Like/dislike tests
    def test_create_like(self):
        response = self.client.post(f"/api/likedislike/profile/{self.profile.id}/", {
            "movie": self.movie.id,
            "is_like": True
        })
        self.assertEqual(response.status_code, 201)
        self.assertEqual(LikeDislike.objects.count(), 1)

    def test_retrieve_like(self):
        LikeDislike.objects.create(profile=self.profile, movie=self.movie, is_like=True)
        response = self.client.get(f"/api/likedislike/profile/{self.profile.id}/movie/{self.movie.id}/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["is_like"], True)

    def test_update_like(self):
        like = LikeDislike.objects.create(profile=self.profile, movie=self.movie, is_like=True)
        response = self.client.put(f"/api/likedislike/profile/{self.profile.id}/movie/{self.movie.id}/", {
            "movie": self.movie.id,
            "is_like": False
        })
        self.assertEqual(response.status_code, 200)
        like.refresh_from_db()
        self.assertEqual(like.is_like, False)

    def test_delete_like(self):
        LikeDislike.objects.create(profile=self.profile, movie=self.movie, is_like=True)
        response = self.client.delete(f"/api/likedislike/profile/{self.profile.id}/movie/{self.movie.id}/")
        self.assertEqual(response.status_code, 204)
        self.assertEqual(LikeDislike.objects.count(), 0)

    def test_movie_likes_view(self):
        LikeDislike.objects.create(profile=self.profile, movie=self.movie, is_like=True)
        response = self.client.get(f"/api/likedislike/movie/{self.movie.id}/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["like_count"], 1)
        self.assertEqual(response.data["dislike_count"], 0)

    # Comment tests
    def test_create_comment(self):
        response = self.client.post(f"/api/comment/profile/{self.profile.id}/", {
            "movie": self.movie.id,
            "comment": "Great movie!"
        })
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Comment.objects.count(), 1)

    def test_retrieve_comment(self):
        Comment.objects.create(profile=self.profile, movie=self.movie, comment="Test comment.")
        response = self.client.get(f"/api/comment/profile/{self.profile.id}/movie/{self.movie.id}/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["comment"], "Test comment.")

    def test_update_comment(self):
        comment = Comment.objects.create(profile=self.profile, movie=self.movie, comment="Old comment.")
        response = self.client.put(f"/api/comment/profile/{self.profile.id}/movie/{self.movie.id}/", {
            "movie": self.movie.id,
            "comment": "New comment."
        })
        self.assertEqual(response.status_code, 200)
        comment.refresh_from_db()
        self.assertEqual(comment.comment, "New comment.")

    def test_delete_comment(self):
        Comment.objects.create(profile=self.profile, movie=self.movie, comment="Comment to delete.")
        response = self.client.delete(f"/api/comment/profile/{self.profile.id}/movie/{self.movie.id}/")
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Comment.objects.count(), 0)

    def test_list_comments_of_movie(self):
        Comment.objects.create(profile=self.profile, movie=self.movie, comment="First comment")
        Comment.objects.create(profile=self.profile, movie=self.movie, comment="Second comment")
        response = self.client.get(f"/api/comment/movie/{self.movie.id}/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
