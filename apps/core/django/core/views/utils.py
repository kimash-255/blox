from django.conf import settings
from core.models import ChangeLog


def log_changes(instance, old_instance, user):
    """
    Log changes between old and new instance states.

    Args:
        instance: The updated instance.
        old_instance: The old instance before update.
        user: The user who made the changes.
    """
    for field in instance._meta.fields:
        field_name = field.name

        # Skip tracking changes for specific fields
        if field_name in {"modified_at", "created_at"}:
            continue

        old_value = getattr(old_instance, field_name, None)
        new_value = getattr(instance, field_name, None)

        # Convert values to string, handling None values
        old_value_str = str(old_value) if old_value is not None else "None"
        new_value_str = str(new_value) if new_value is not None else "None"

        if old_value_str != new_value_str:
            ChangeLog.objects.create(
                model_name=instance.__class__.__name__,
                object_id=instance.id,
                field_name=field_name,
                old_value=old_value_str,
                new_value=new_value_str,
                user=user,
            )


def log_create(instance, user):
    for field in instance._meta.fields:
        field_name = field.name

        # Skip tracking changes for specific fields
        if field_name in {"modified_at", "created_at"}:
            continue

        old_value = None
        new_value = getattr(instance, field_name, None)

        # Convert values to string, handling None values
        old_value_str = str(old_value) if old_value is not None else "None"
        new_value_str = str(new_value) if new_value is not None else "None"

        if old_value_str != new_value_str:
            ChangeLog.objects.create(
                model_name=instance.__class__.__name__,
                object_id=instance.id,
                field_name=field_name,
                old_value=old_value_str,
                new_value=new_value_str,
                user=user,
            )
