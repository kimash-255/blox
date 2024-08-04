from django.urls import path, include
from rest_framework.routers import DefaultRouter
from masafa.views import *

router = DefaultRouter()

router.register(r'danci', DanciViewSet)

urlpatterns = [path('', include(router.urls)),]
