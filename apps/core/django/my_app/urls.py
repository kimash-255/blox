from django.urls import path, include
from rest_framework.routers import DefaultRouter
from my_app.views import *

router = DefaultRouter()

from django.urls import path
urlpatterns = [
    # Define your app's URLs here
]
router.register(r'try', TryViewSet)
router.register(r'turn', TurnViewSet)

urlpatterns = [path('', include(router.urls)),]
