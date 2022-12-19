from django.urls import re_path, path  # FOR WEBSOCKETS (CHANNELS)
from . import consumers  # FOR WEBSOCKETS (CHANNELS)

websocket_urlpatterns = [
    # URL PARA WEBSOCKETS (CHANNELS) CHAT
    re_path(r'ws/chat/test/', consumers.ChatConsumer.as_asgi()),
]
