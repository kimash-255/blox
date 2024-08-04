from django.urls import path, include
from rest_framework.routers import DefaultRouter
from new1.views import *

router = DefaultRouter()

router.register(r'nnn', NnnViewSet)

urlpatterns = [path('', include(router.urls)),]
