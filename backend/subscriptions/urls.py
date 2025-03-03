from django.urls import path
from .views import SubscriptionListCreateView

urlpatterns = [
    path("subscription/", SubscriptionListCreateView.as_view(), name="subscription-list-create"),
]
