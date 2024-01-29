from django.shortcuts import render, get_object_or_404
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from .models import Room
from .serializers import RoomSerializer, CreateRoomSerializer, UpdateRoomSettingsSerializer

class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        # Ensure session exists for the user
        if not request.session.exists(request.session.session_key):
            request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.validated_data.get('guest_can_pause')
            votes_to_skip = serializer.validated_data.get('votes_to_skip')
            host = request.session.session_key

            # Create or update the room
            room, created = Room.objects.update_or_create(
                host=host,
                defaults={'guest_can_pause': guest_can_pause, 'votes_to_skip': votes_to_skip}
            )
            request.session['room_code'] = room.code  # Set room code in session after room creation

            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        else:
            # Log and return serializer errors for debugging
            print("Serializer errors:", serializer.errors)
            return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
        
class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code is not None:
            try:
                room = get_object_or_404(Room, code=code)
                data = RoomSerializer(room).data
                data['is_host'] = request.session.session_key == room.host
                return Response(data, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response({'error': 'Code parameter not found'}, status=status.HTTP_400_BAD_REQUEST)
                

class RoomJoinView(APIView):
    lookup_url_kwarg = 'code'

    def post(self, request, format=None):
        if self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        code = request.data.get(self.lookup_url_kwarg)
        if code != None:
            try:
                room_result = get_object_or_404(Room, code=code)
                self.request.session['room_code'] = code
                return Response({'message': 'Room Joined!'}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response({'Bad Request': 'Code parameter not found'}, status=status.HTTP_400_BAD_REQUEST)
                
class CheckRoom(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        data = {'code': self.request.session.get('room_code', None)}

        return JsonResponse(data, status=status.HTTP_200_OK)
 
class LeaveRoom(APIView):
    def post(self, request, format=None):
        if 'room_code' in self.request.session:
            self.request.session.pop('room_code')
            host_id = self.request.session.session_key
            room = Room.objects.filter(host=host_id).first()
            if room:
                room.delete()
                return Response({'message': 'Room deleted successfully'}, status=status.HTTP_200_OK)

        return Response({'message': 'Success'}, status=status.HTTP_200_OK)

class UpdateRoomSettingsView(APIView):
    serializer_class = UpdateRoomSettingsSerializer

    def patch(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        room_code = serializer.validated_data.get('code')
        room = Room.objects.filter(code=room_code).first()

        if not room:
            return Response({'message': 'Room Not Found'}, status=status.HTTP_404_NOT_FOUND)

        if room.host != request.session.session_key:
            return Response({'message': 'You are not the Host'}, status=status.HTTP_403_FORBIDDEN)

        room.guest_can_pause = serializer.validated_data.get('guest_can_pause')
        room.votes_to_skip = serializer.validated_data.get('votes_to_skip')
        room.save(update_fields=['guest_can_pause', 'votes_to_skip'])

        return Response(RoomSerializer(room).data)
    
class IsUserHost(APIView):
    def get(self, request, *args, **kwargs):
        room_code = request.session.get('room_code')
        if not room_code:
            return JsonResponse({'host': False})

        room = Room.objects.filter(code=room_code).first()
        is_host = room and room.host == request.session.session_key

        return JsonResponse({'host': is_host})
