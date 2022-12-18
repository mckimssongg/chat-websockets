import os

from django.core.asgi import get_asgi_application
# FOR WEBSOCKETS (CHANNELS)
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import api.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

# application = get_asgi_application() # FOR HTTP REQUESTS ONLY

application = ProtocolTypeRouter({
    # FOR HTTP REQUESTS ONLY (NOT FOR WEBSOCKETS)
    'http': get_asgi_application(),
    # FOR WEBSOCKETS (CHANNELS)
    'websocket': AuthMiddlewareStack(

    )
})
