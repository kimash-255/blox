from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AppViewSet, ModuleViewSet, CreateAppAPIView, CreateModuleAPIView
)

router = DefaultRouter()
router.register(r"apps", AppViewSet)
router.register(r"modules", ModuleViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('addmodule/', CreateModuleAPIView.as_view()),
    path('startapp/', CreateAppAPIView.as_view()),
]
