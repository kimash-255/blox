import os
import subprocess
import string
import random
from django.conf import settings
from django.db import models
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from core.models import App, Module, Document, ChangeLog
from core.filters import AppFilter, ModuleFilter, DocumentFilter, ChangeLogFilter
from core.serializers import (
    AppSerializer,
    ModuleSerializer,
    DocumentSerializer,
    ChangeLogSerializer,
)
from .template import GenericViewSet

APPS_TXT_PATH = os.path.join(settings.PROJECT_PATH, "config", "apps.txt")


def clean_apps():
    with open(APPS_TXT_PATH, "r") as apps_file:
        valid_apps = [
            app.strip()
            for app in apps_file.readlines()
            if app.strip() and not app.strip().startswith("#")
        ]

    apps = App.objects.all()
    for app in apps:
        if app.id not in valid_apps:
            app.delete()


def run_subprocess(command, success_message, error_message):
    try:
        subprocess.run(command, check=True)
        return Response({"message": success_message}, status=status.HTTP_200_OK)
    except subprocess.CalledProcessError:
        return Response(
            {"error": error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


class ChangeLogViewSet(GenericViewSet):
    queryset = ChangeLog.objects.all()
    serializer_class = ChangeLogSerializer
    filterset_class = ChangeLogFilter


class CreateAppAPIView(APIView):
    def post(self, request, *args, **kwargs):
        appname = request.data.get("appname")

        if not appname:
            return Response(
                {"error": "Missing 'appname' parameter"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return run_subprocess(
            ["blox", "startapp", appname],
            "App created successfully",
            "Failed to create app",
        )


class AppViewSet(GenericViewSet):
    queryset = App.objects.all()
    serializer_class = AppSerializer
    filterset_class = AppFilter

    def create(self, request, *args, **kwargs):
        clean_apps()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        app = App.objects.get(pk=serializer.data["id"])
        Module.objects.create(**request.data, app=app)

        response_data = serializer.data
        response_data["additional"] = {
            "type": "startapp",
            "info": {"message": "App created and ready to be used."},
        }

        headers = self.get_success_headers(serializer.data)
        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)

    def destroy(self, request, *args, **kwargs):
        app_name = self.get_object().id

        if not app_name:
            return Response(
                {"error": "Missing app name"}, status=status.HTTP_400_BAD_REQUEST
            )

        self.get_object().delete()
        return run_subprocess(
            ["blox", "deleteapp", app_name],
            "App deleted successfully",
            "Failed to delete app",
        )


class CreateModuleAPIView(APIView):
    def post(self, request, *args, **kwargs):
        modulename = request.data.get("modulename")

        if not modulename:
            return Response(
                {"error": "Missing 'modulename' parameter"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        module = Module.objects.get(pk=modulename)
        return run_subprocess(
            ["blox", "addmodule", module.app.id, module.id],
            "Module created successfully",
            "Failed to create module",
        )


class ModuleViewSet(GenericViewSet):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    filterset_class = ModuleFilter

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        response_data = serializer.data
        response_data["additional"] = {
            "type": "addmodule",
            "info": {"message": "Module created and ready to be used."},
        }

        headers = self.get_success_headers(serializer.data)
        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)

    def destroy(self, request, *args, **kwargs):
        module = self.get_object()
        module_name = module.id
        app_name = module.app.id

        if not module_name:
            return Response(
                {"error": "Missing module name"}, status=status.HTTP_400_BAD_REQUEST
            )

        module.delete()
        return run_subprocess(
            ["blox", "deletemodule", app_name, module_name],
            "Module deleted successfully",
            "Failed to delete module",
        )


class CreateDocumentAPIView(APIView):
    def post(self, request, *args, **kwargs):
        documentname = request.data.get("documentname")
        app = request.data.get("app")
        module = request.data.get("module")

        return run_subprocess(
            ["blox", "doc", "new", "--app", app, "--module", module, documentname],
            "Document created successfully",
            "Failed to create document",
        )


class DocumentViewSet(GenericViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    filterset_class = DocumentFilter

    def create(self, request, *args, **kwargs):
        try:
            data = request.data

            module_id = request.data.get("module")
            if module_id:
                try:
                    module = Module.objects.get(pk=module_id)
                    data["app"] = module.app.id
                except Module.DoesNotExist:
                    return Response(
                        {"detail": "Invalid module ID."},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)

            response_data = serializer.data
            response_data["additional"] = {
                "type": "newdoc",
                "info": {"message": "Document created and ready to be used."},
            }

            headers = self.get_success_headers(serializer.data)
            return Response(
                response_data, status=status.HTTP_201_CREATED, headers=headers
            )

        except Exception as e:
            print(e)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        document = self.get_object()
        document_name = document.id
        app = document.app.id
        module = document.module.id

        if not document_name:
            return Response(
                {"error": "Missing document name"}, status=status.HTTP_400_BAD_REQUEST
            )

        document.delete()
        return run_subprocess(
            ["blox", "doc", "delete", "--app", app, "--module", module, document_name],
            "Document deleted successfully",
            "Failed to delete document",
        )


class MigrateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        app_name = request.data.get("app")
        module_name = request.data.get("module")
        doc_name = request.data.get("doc")

        command = ["blox", "migrate"]
        if doc_name:
            doc = Document.objects.get(pk=doc_name)
            command.append(f"--app")
            command.append(doc.app.id)
            command.append(f"--module")
            command.append(doc.module.id)
            command.append(f"--doc")
            command.append(doc.id)
        elif module_name:
            module = Module.objects.get(pk=module_name)
            command.append(f"--app")
            command.append(module.app.id)
            command.append(f"--module")
            command.append(module.id)
        elif app_name:
            command.append(f"--app")
            command.append(app_name)

        return run_subprocess(command, "Migration successful", "Migration failed")
