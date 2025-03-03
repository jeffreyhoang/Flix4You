from django.urls import path
from .views import HistoryListCreateView

urlpatterns = [
    path("history/", HistoryListCreateView.as_view(), name="history-list-create"),
]
