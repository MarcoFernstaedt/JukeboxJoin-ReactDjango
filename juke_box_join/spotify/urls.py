from django.urls import path
from .views import AuthUrl

urlpatterns = [
    path('auth', AuthUrl.as_view())
]

