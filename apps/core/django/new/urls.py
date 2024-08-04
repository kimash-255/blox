from django.urls import path, include
from rest_framework.routers import DefaultRouter
from new.views import *

router = DefaultRouter()

router.register(r'new', NewViewSet)

urlpatterns = [path('', include(router.urls)),]
