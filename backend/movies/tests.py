from django.test import TestCase
from rest_framework.test import APITestCase
from .models import Genre, Director, Actor, Movie
from datetime import date

class TestModels(TestCase):
    def setUp(self):
        self.genre1 = Genre.objects.create(name="Action")
        self.genre2 = Genre.objects.create(name="Adventure")
        self.actor1 = Actor.objects.create(name="Actor One")
        self.actor2 = Actor.objects.create(name="Actor Two")
        self.director1 = Director.objects.create(name="Director One")

        self.movie = Movie.objects.create(
            title="Test Movie",
            description="A test movie.",
            release_date=date(2023, 1, 1),
            duration=120,
            rating="PG-13",
            imdbRating=7.5,
            poster_url="https://example.com/poster.jpg",
            trailer_url="https://example.com/trailer.mp4",
            movie_url="https://example.com/movie.mp4"
        )

        self.movie.genres.set([self.genre1, self.genre2])
        self.movie.actors.set([self.actor1, self.actor2])
        self.movie.directors.set([self.director1])

    def test_movie_creation(self):
        self.assertEqual(self.movie.title, "Test Movie")
        self.assertEqual(self.movie.description, "A test movie.")
        self.assertEqual(self.movie.release_date, date(2023, 1, 1))
        self.assertEqual(self.movie.duration, 120)
        self.assertEqual(self.movie.rating, "PG-13")
        self.assertEqual(self.movie.imdbRating, 7.5)
        self.assertEqual(self.movie.poster_url, "https://example.com/poster.jpg")
        self.assertEqual(self.movie.trailer_url, "https://example.com/trailer.mp4")
        self.assertEqual(self.movie.movie_url, "https://example.com/movie.mp4")
        self.assertIn(self.genre1, self.movie.genres.all())
        self.assertIn(self.genre2, self.movie.genres.all())
        self.assertIn(self.actor1, self.movie.actors.all())
        self.assertIn(self.actor2, self.movie.actors.all())
        self.assertIn(self.director1, self.movie.directors.all())

    def test_str_methods(self):
        self.assertEqual(str(self.genre1), "Action")
        self.assertEqual(str(self.actor1), "Actor One")
        self.assertEqual(str(self.director1), "Director One")
        self.assertEqual(str(self.movie), "Test Movie")

class TestViews(APITestCase):
    def setUp(self):
        self.genre = Genre.objects.create(name="Action")
        self.movie1 = Movie.objects.create(
            title="Movie 1",
            description="The first movie.",
            release_date=date(2023, 1, 1),
            duration=100,
            rating="PG-13",
            imdbRating=8.5,
        )
        self.movie2 = Movie.objects.create(
            title="Movie 2",
            description="The second movie.",
            release_date=date(2022, 1, 1),
            duration=120,
            rating="PG-13",
            imdbRating=7.5,
        )
        self.movie1.genres.add(self.genre)
    
    def test_movie_list_view(self):
        response = self.client.get("/api/movies/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_movie_by_ids_view(self):
        response = self.client.get(f"/api/movies/by-ids/?movie_ids={self.movie1.id},{self.movie2.id}")
        self.assertEqual(response.status_code, 200)
        titles = [movie['title'] for movie in response.data]
        self.assertIn("Movie 1", titles)
        self.assertIn("Movie 2", titles)

    def test_movie_by_genre_view(self):
        response = self.client.get("/api/movies/by-genre/?movie_genre=Action")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], "Movie 1")
