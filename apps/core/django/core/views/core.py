import os
import subprocess
from core.models import (
    App, Module
)
from core.filters import (
    AppFilter, ModuleFilter
)
from core.serializers import (
    AppSerializer, ModuleSerializer
)
from .template import GenericViewSet
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings


APPS_TXT_PATH = os.path.join(settings.PROJECT_PATH, 'config', 'apps.txt')


def clean_apps():
    with open(APPS_TXT_PATH, 'r') as apps_file:
        valid_apps = [app.strip() for app in apps_file.readlines()
                      if app.strip() and not app.strip().startswith('#')]

    apps = App.objects.all()
    for app in apps:
        name = app.id
        if name not in valid_apps:
            app.delete()


def delete_app(appname):
    subprocess.run(['blox', 'deleteapp', appname], check=True)


class CreateAppAPIView(APIView):
    def post(self, request, *args, **kwargs):

        appname = request.data.get('appname')

        if not appname:
            return Response({"error": "Missing 'appname' parameter"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            subprocess.run(['blox', 'startapp', appname], check=True)
        except subprocess.CalledProcessError as e:

            return Response({"error": "Failed to create app"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "App created successfully"}, status=status.HTTP_201_CREATED)


class AppViewSet(GenericViewSet):
    queryset = App.objects.all()
    serializer_class = AppSerializer
    filterset_class = AppFilter

    def create(self, request, *args, **kwargs):
        clean_apps()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)
        response_data = serializer.data

        additional_data = {
            "type": "startapp",
            "info": {
                "message": "App created and ready to be used."
            }
        }

        response_data["additional"] = additional_data

        headers = self.get_success_headers(serializer.data)
        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)

    def destroy(self, request, *args, **kwargs):

        app_name = self.get_object().id

        self.get_object().delete()
        if not app_name:
            return Response({"error": "Missing app name"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            delete_app(app_name)
        except subprocess.CalledProcessError as e:
            return Response({"error": "Failed to delete app"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "App deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


class CreateModuleAPIView(APIView):
    def post(self, request, *args, **kwargs):

        modulename = request.data.get('modulename')

        module = Module.objects.get(pk=modulename)
        print(module.app.id, module.id)

        if not modulename:
            return Response({"error": "Missing 'modulename' parameter"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            subprocess.run(
                ['blox', 'addmodule', module.app.id, module.id], check=True)
        except subprocess.CalledProcessError as e:

            return Response({"error": "Failed to create module"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "module created successfully"}, status=status.HTTP_201_CREATED)


def delete_module(app_name, modulename):
    subprocess.run(['blox', 'deletemodule', app_name, modulename], check=True)


class ModuleViewSet(GenericViewSet):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    filterset_class = ModuleFilter

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)
        response_data = serializer.data

        additional_data = {
            "type": "addmodule",
            "info": {
                "message": "Module created and ready to be used."
            }
        }

        response_data["additional"] = additional_data

        headers = self.get_success_headers(serializer.data)
        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)

    def destroy(self, request, *args, **kwargs):

        module_name = self.get_object().id
        app_name = self.get_object().app.id

        self.get_object().delete()
        if not module_name:
            return Response({"error": "Missing module name"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            delete_module(app_name, module_name)
        except subprocess.CalledProcessError as e:
            return Response({"error": "Failed to delete module"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "module deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
