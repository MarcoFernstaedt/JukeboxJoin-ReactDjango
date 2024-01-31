from django.shortcuts import render
from requests import Request, post
from rest_framework.views import APIView
from rest_framework.status import status
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

        return Response({'url': url}, status=status.HTTP_200_ok)