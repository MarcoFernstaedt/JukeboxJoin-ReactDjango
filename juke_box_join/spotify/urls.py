from django.urls import path
from .views import AuthUrl, SpotifyCallback

urlpatterns = [
    path('auth', AuthUrl.as_view()),
    path('redirect', SpotifyCallback.as_view())
]