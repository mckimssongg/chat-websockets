import os


# FOR WEBSOCKETS (CHANNELS)
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from api.routing import websocket_urlpatterns as api_websocket_urlpatterns
# FOR HTTP REQUESTS ONLY
from django.core.asgi import get_asgi_application


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

# application = get_asgi_application() # FOR HTTP REQUESTS ONLY

application = ProtocolTypeRouter({
    # FOR HTTP REQUESTS ONLY (NOT FOR WEBSOCKETS)
    'http': get_asgi_application(),
    # FOR WEBSOCKETS (CHANNELS)
    'websocket': AuthMiddlewareStack(
        URLRouter(
            api_websocket_urlpatterns  # URLS FOR WEBSOCKETS (CHANNELS)
        )
    )
})
