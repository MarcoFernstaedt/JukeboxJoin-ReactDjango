from ..models import SpotifyToken
from django.utils import timezone
from datetime import timedelta

def get_user_token(session_id):
    user_session = SpotifyToken.objects.filter(user=session_id).first
    if user_session.exists():
        return user_session
    else:
        return None
    
def update_or_create_token(session_id, access_token, token_type, refresh_token, expires_in):
    token = get_user_token(session_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in)

    if token:
        token.access_token = access_token
        token.refresh_token = refresh_token
        token.expires_in = expires_in
        token.token_type = token_type
        token.save(update_fields=['access_token', 'refresh_token', 'expires_in', 'token_type'])
    else:
        token = SpotifyToken(user=session_id, access_token=access_token, refresh_token=refresh_token, expires_in= expires_in, token_type=token_type)
        token.save()