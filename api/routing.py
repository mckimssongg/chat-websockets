from django.urls import re_path  # FOR WEBSOCKETS (CHANNELS)
from . import consumers  # FOR WEBSOCKETS (CHANNELS)

websocket_urlpatterns = [
    # URL PARA WEBSOCKETS (CHANNELS) CHAT
    re_path(r'ws/chat/(?P<room_name>\w+)/$', consumers.ChatConsumer),
]
