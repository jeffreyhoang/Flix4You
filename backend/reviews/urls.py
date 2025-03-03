from django.urls import path
from .views import ReviewListCreateView

urlpatterns = [
    path("reviews/", ReviewListCreateView.as_view(), name="review-list-create"),
]
