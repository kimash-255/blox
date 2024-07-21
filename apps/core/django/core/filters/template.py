import django_filters


class DynamicFilterSet(django_filters.FilterSet):
    class Meta:
        model = None
        fields = ()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Create a list to store dynamically added keys
        dynamic_keys = []

        # Iterate over the existing keys
        for field_name in list(self.filters.keys()):
            # Iterate over the conditions
            for condition in [
                "lt",
                "gt",
                "lte",
                "gte",
                "icontains",
                "istartswith",
                "iendswith",
            ]:
                # Create the new key
                new_field_name = f"{field_name}__{condition}"
                # Add it to the list
                dynamic_keys.append(new_field_name)
                # Add it to the filters dictionary
                self.filters[new_field_name] = django_filters.CharFilter(
                    field_name=field_name, lookup_expr=condition
                )

                # Add __exclude filter for this condition
                new_exclude_field_name = f"{field_name}__{condition}__exclude"
                dynamic_keys.append(new_exclude_field_name)
                # Add a CharFilter with exclude=True to filter out results not matching the condition
                self.filters[new_exclude_field_name] = django_filters.CharFilter(
                    field_name=field_name, lookup_expr=condition, exclude=True
                )

            # Add __exclude filter for exact matching
            new_exclude_field_name = f"{field_name}__exclude"
            dynamic_keys.append(new_exclude_field_name)
            # Add a CharFilter with exact matching and exclude=True
            self.filters[new_exclude_field_name] = django_filters.CharFilter(
                field_name=field_name, lookup_expr="exact", exclude=True
            )

            # Add __isnull filter for checking non-null values
            new_isnull_field_name = f"{field_name}__isnull"
            dynamic_keys.append(new_isnull_field_name)
            self.filters[new_isnull_field_name] = django_filters.BooleanFilter(
                field_name=field_name, lookup_expr="isnull"
            )
        # Add filters for the 'id' field with comparison operators
        for condition in ["lt", "gt", "lte", "gte"]:
            # Create the new key for the 'id' field with the condition
            new_field_name = f"id__{condition}"
            # Add it to the list
            dynamic_keys.append(new_field_name)
            # Add it to the filters dictionary
            self.filters[new_field_name] = django_filters.NumberFilter(
                field_name="id", lookup_expr=condition
            )

            # Add __exclude filter for id field
            new_exclude_field_name = f"id__{condition}__exclude"
            dynamic_keys.append(new_exclude_field_name)
            # Add it to the filters dictionary
            self.filters[new_exclude_field_name] = django_filters.NumberFilter(
                field_name="id", lookup_expr=condition, exclude=True
            )

            # Add __isnull filter for id field
            new_isnull_field_name = f"id__isnull"
            dynamic_keys.append(new_isnull_field_name)
            self.filters[new_isnull_field_name] = django_filters.BooleanFilter(
                field_name="id", lookup_expr="isnull"
            )

        # Add start and stop filters for id field
        dynamic_keys.extend(["start", "stop"])
        self.filters["start"] = django_filters.NumberFilter(
            field_name="id", lookup_expr="gte"
        )
        self.filters["stop"] = django_filters.NumberFilter(
            field_name="id", lookup_expr="lte"
        )

        # Add filters for first and last entries
        dynamic_keys.extend(["first", "last"])
        self.filters["first"] = django_filters.NumberFilter(
            method=self.filter_first)
        self.filters["last"] = django_filters.NumberFilter(
            method=self.filter_last)

        # Add filters for page
        dynamic_keys.extend(["page"])
        self.filters["page"] = django_filters.CharFilter(
            method=self.filter_page)

        # Store the page_length value, defaulting to 5
        self.page_length_value = 5
        self.total_pages = 1  # Default total pages

        # Now iterate over the dynamically added keys and add corresponding filter methods
        for key in dynamic_keys:
            method_name = f"filter_{key}"
            setattr(self, method_name, self.create_filter_method(method_name))

    def create_filter_method(self, method_name):
        # Add more custom filter methods here if needed
        return None

    def filter_first(self, queryset, name, value):
        return queryset[: int(value)]

    def filter_last(self, queryset, name, value):
        count = queryset.count()
        return queryset[count - int(value):] if count > int(value) else queryset

    def filter_page(self, queryset, name, value):
        total_items = queryset.count()
        page = int(value.split("-")[0])
        page_length = (
            int(value.split("-")
                [1]) if value.split("-")[1] else self.page_length_value
        )
        self.total_pages = (
            total_items + page_length - 1
        ) // page_length  # Calculate the total number of pages

        if page > self.total_pages or page < 1:
            return (
                queryset.none()
            )  # Return an empty queryset if the page is out of range

        start_index = (page - 1) * page_length
        end_index = start_index + page_length
        return queryset[start_index:end_index]
