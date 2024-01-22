from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Room
from .serializers import RoomSerializer, CreateRoomSerializer

class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer  # Use serializer_class for consistency

    def post(self, request, format=None):
        # Ensure session exists for the user
        if not request.session.exists(request.session.session_key):
            request.session.create()

        # Deserialize the incoming data
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.validated_data.get('guest_can_pause')
            votes_to_skip = serializer.validated_data.get('votes_to_skip')
            host = request.session.session_key
            room, created = Room.objects.update_or_create(
                host=host,
                defaults={'guest_can_pause': guest_can_pause, 'votes_to_skip': votes_to_skip}
            )

            # Return the room data with a status code
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        
        # Return a 400 response if the data is invalid
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)