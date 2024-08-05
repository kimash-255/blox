from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AppViewSet,
    ModuleViewSet,
    CreateAppAPIView,
    CreateModuleAPIView,
    CreateDocumentAPIView,
    DocumentViewSet,
    MigrateAPIView,
    ChangeLogViewSet,
)

router = DefaultRouter()
router.register(r"apps", AppViewSet)
router.register(r"modules", ModuleViewSet)
router.register(r"documents", DocumentViewSet)
router.register(r"changelogs", ChangeLogViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("addmodule/", CreateModuleAPIView.as_view(), name="create-module"),
    path("startapp/", CreateAppAPIView.as_view(), name="create-app"),
    path("newdoc/", CreateDocumentAPIView.as_view(), name="create-document"),
    path("migrate/", MigrateAPIView.as_view(), name="migrate"),
]
