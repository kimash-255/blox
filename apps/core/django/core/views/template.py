from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.response import Response


def handle_errors(func):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            print(e)
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    return wrapper


def custom_list(self, request):
    # Get the initial queryset
    queryset = self.get_queryset().order_by("-id")  # Sort by id in descending order

    # Extract and remove 'page' and 'page_length' from request query params
    query_params = request.GET.copy()
    page = query_params.pop("page", [1])[0]
    page_length = query_params.pop("page_length", [5])[0]

    # Create the filterset instance, without the page and page_length filters
    filter_class = self.filterset_class
    filterset = filter_class(
        data=query_params, queryset=queryset, request=request)
    try:
        filtered_queryset = filterset.qs
    except:
        filtered_queryset = queryset

    # Calculate the total length of the filtered data
    total = filtered_queryset.count()

    # Apply pagination
    try:
        page = int(page) if page else 1
        page_length = int(page_length)
    except ValueError:
        page = 1
        page_length = 5

    total_pages = (
        total + page_length - 1
    ) // page_length  # Calculate the total number of pages

    # if page > total_pages or page < 1:
    #     return {"error": "Page out of range"}

    start_index = (page - 1) * page_length
    end_index = start_index + page_length
    paginated_queryset = filtered_queryset[start_index:end_index]

    # Serialize the paginated data
    serializer = self.get_serializer(paginated_queryset, many=True)
    return {
        "list": serializer.data,
        "total": total,
        "total_pages": total_pages,
        "current_page": page,
    }


class GenericViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]

    @handle_errors
    def list(self, request, *args, **kwargs):
        return Response(custom_list(self, request))

    @handle_errors
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @handle_errors
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @handle_errors
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    @handle_errors
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class SaveMixin:
    def save_instance(
        self,
        request,
        model,
        serializer_class,
        pk=None,
        partial=False,
        related_fields=None,
    ):
        related_fields = related_fields or {}

        try:
            instance_data = {}

            # Filter out empty values and assign non-empty values to instance_data
            for field, related_model in related_fields.items():
                field_value = request.data.get(field)
                if field_value in ["", None]:
                    continue  # Skip empty values
                try:
                    related_instance = related_model.objects.get(
                        id=field_value)
                    instance_data[field] = related_instance
                except related_model.DoesNotExist:
                    return Response(
                        {f"error": f"{field} not found"},
                        status=status.HTTP_404_NOT_FOUND,
                    )

            # Include other fields from request data
            instance_data.update(
                {
                    k: v
                    for k, v in request.data.items()
                    if v != "" and k not in related_fields
                }
            )

            if pk:
                # Update existing instance
                try:
                    instance = model.objects.get(pk=pk)
                    if partial:
                        # Update only provided fields
                        for attr, value in instance_data.items():
                            setattr(instance, attr, value)
                    else:
                        # Full update: clear existing values before setting new ones
                        for field in instance._meta.fields:
                            if (
                                field.name not in instance_data
                                and field.name != model._meta.pk.name
                            ):
                                setattr(instance, field.name, None)
                        for attr, value in instance_data.items():
                            setattr(instance, attr, value)
                    instance.save()
                    status_code = status.HTTP_200_OK
                except model.DoesNotExist:
                    return Response(
                        {"error": f"{model.__name__} not found"},
                        status=status.HTTP_404_NOT_FOUND,
                    )
            else:
                # Create new instance
                instance = model.objects.create(**instance_data)
                status_code = status.HTTP_201_CREATED

            serializer = serializer_class(instance)
            return Response(serializer.data, status=status_code)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class CustomSaveViewSet(GenericViewSet, SaveMixin):
    model = None
    serializer_class = None
    related_fields = {}

    def save(self, request, pk=None, *args, **kwargs):
        partial = request.method == "PATCH"
        return self.save_instance(
            request,
            self.model,
            self.serializer_class,
            pk=pk,
            partial=partial,
            related_fields=self.related_fields,
        )

    def create(self, request, *args, **kwargs):
        return self.save(request, *args, **kwargs)

    def update(self, request, pk=None, *args, **kwargs):
        return self.save(request, pk=pk, *args, **kwargs)

    def partial_update(self, request, pk=None, *args, **kwargs):
        return self.save(request, pk=pk, *args, **kwargs)


class UpdateMixin:
    def update_instance(
        self, request, model, serializer_class, pk, related_fields=None
    ):
        related_fields = related_fields or {}

        try:
            instance_data = {}

            # Filter out empty values and assign non-empty values to instance_data
            for field, related_model in related_fields.items():
                field_value = request.data.get(field)
                if field_value in ["", None]:
                    continue  # Skip empty values
                try:
                    related_instance = related_model.objects.get(
                        id=field_value)
                    instance_data[field] = related_instance
                except related_model.DoesNotExist:
                    return Response(
                        {f"error": f"{field} not found"},
                        status=status.HTTP_404_NOT_FOUND,
                    )

            # Include other fields from request data
            instance_data.update(
                {
                    k: v
                    for k, v in request.data.items()
                    if v != "" and k not in related_fields
                }
            )

            # Get the instance to be updated
            instance = model.objects.get(pk=pk)

            # Update instance with the new data
            for attr, value in instance_data.items():
                setattr(instance, attr, value)
            instance.save()

            serializer = serializer_class(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except model.DoesNotExist:
            return Response(
                {"error": f"{model.__name__} not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class CreateMixin:
    def create_instance(self, request, model, serializer_class, related_fields=None):
        related_fields = related_fields or {}

        try:
            instance_data = {}

            # Filter out empty values and assign non-empty values to instance_data
            for field, related_model in related_fields.items():
                field_value = request.data.get(field)
                if field_value in ["", None]:
                    continue  # Skip empty values
                try:
                    related_instance = related_model.objects.get(
                        id=field_value)
                    instance_data[field] = related_instance
                except related_model.DoesNotExist:
                    return Response(
                        {f"error": f"{field} not found"},
                        status=status.HTTP_404_NOT_FOUND,
                    )

            # Include other fields from request data
            instance_data.update(
                {
                    k: v
                    for k, v in request.data.items()
                    if v != "" and k not in related_fields
                }
            )

            instance = model.objects.create(**instance_data)
            serializer = serializer_class(instance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
