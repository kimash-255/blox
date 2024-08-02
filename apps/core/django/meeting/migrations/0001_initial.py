# Generated by Django 4.2.5 on 2024-08-02 22:26

import core.models.template
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='David',
            fields=[
                ('id', models.CharField(default=core.models.template.generate_random_slug, editable=False, max_length=100, primary_key=True, serialize=False, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
