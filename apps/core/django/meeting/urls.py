from django.urls import path, include
from rest_framework.routers import DefaultRouter
from meeting.views import *

router = DefaultRouter()

from django.urls import path
urlpatterns = [
    # Define your app's URLs here
]
router.register(r'david', DavidViewSet)

urlpatterns = [path('', include(router.urls)),]
