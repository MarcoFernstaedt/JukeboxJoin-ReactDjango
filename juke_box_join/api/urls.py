from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom, RoomJoinView, CheckRoom, LeaveRoom, UpdateRoomSettingsView, IsUserHost

urlpatterns = [
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join-room', RoomJoinView.as_view()),
    path('check-room', CheckRoom.as_view()),
    path('leave-room', LeaveRoom.as_view()),
    path('update-room', UpdateRoomSettingsView.as_view()),
    path('is-host', IsUserHost.as_view())
]
