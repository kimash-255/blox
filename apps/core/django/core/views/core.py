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
import subprocess

from rest_framework import status
from rest_framework.response import Response


class AppViewSet(GenericViewSet):
    queryset = App.objects.all()
    serializer_class = AppSerializer
    filterset_class = AppFilter

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # Get the appname from the serializer data (assuming 'name' is the field)
        appname = serializer.validated_data.get('name')

        # Run 'blox startapp appname' command
        try:
            subprocess.run(['blox', 'startapp', appname], check=True)
        except subprocess.CalledProcessError as e:
            # Handle the error if needed
            pass

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ModuleViewSet(GenericViewSet):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    filterset_class = ModuleFilter
