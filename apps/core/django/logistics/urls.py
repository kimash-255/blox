from django.urls import path, include
from rest_framework.routers import DefaultRouter
from logistics.views import *

router = DefaultRouter()

from django.urls import path
urlpatterns = [
    # Define your app's URLs here
]
router.register(r'item', ItemViewSet)

urlpatterns = [path('', include(router.urls)),]
