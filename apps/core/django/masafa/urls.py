from django.urls import path, include
from rest_framework.routers import DefaultRouter
from masafa.views import *

router = DefaultRouter()

router.register(r'danci', DanciViewSet)
router.register(r'cold', ColdViewSet)
router.register(r'say', SayViewSet)

urlpatterns = [path('', include(router.urls)),]
