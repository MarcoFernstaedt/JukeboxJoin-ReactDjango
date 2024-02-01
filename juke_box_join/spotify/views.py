from django.shortcuts import render
from requests import post
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
import os

class AuthUrl(APIView):
    def get(self, request, format=None):
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'

        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': os.getenv('REDIRECT_URI'),
            'client_id': os.getenv('CLIENT_ID')
        }).prepare().url

        return Response({'url': url}, status=status.HTTP_200_OK)

class SpotifyCallback(APIView):
    def get(self, request, format=None):
        code = request.GET.get('code')
        error = request.GET.get('error')

        if error:
            return Response({'error': error}, status=status.HTTP_400_BAD_REQUEST)

        response = post('https://accounts.spotify.com/api/token', data={
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': os.getenv('REDIRECT_URI'),
            'client_id': os.getenv('CLIENT_ID'),
            'client_secret': os.getenv('CLIENT_SECRET')
        }).json()

        access_token = response.get('access_token')
        token_type = response.get('token_type')
        refresh_token = response.get('refresh_token')
        expires_in = response.get('expires_in')
        error = response.get('error')

        if error:
            return Response({'error': error}, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            'access_token': access_token,
            'token_type': token_type,
            'refresh_token': refresh_token,
            'expires_in': expires_in
        }, status=status.HTTP_200_OK)
 

def roteate_slope(arr, slope):
    sloped_array = []
    for arr[slope] in arr:
        return sloped_array.append(arr[slope])