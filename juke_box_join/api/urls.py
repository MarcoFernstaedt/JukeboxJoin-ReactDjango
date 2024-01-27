from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom, RoomJoinView, UserBelongsToRoom

urlpatterns = [
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join-room', RoomJoinView.as_view()),
    path('user-in-room', UserBelongsToRoom.as_view())
]
