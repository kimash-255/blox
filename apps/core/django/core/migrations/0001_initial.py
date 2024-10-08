# Generated by Django 4.2.5 on 2024-08-05 20:21

import core.models.template
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='App',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('status', models.CharField(default='Active', max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('id', models.CharField(editable=False, max_length=10, primary_key=True, serialize=False, unique=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ChangeLog',
            fields=[
                ('id', models.CharField(default=core.models.template.generate_random_slug, editable=False, max_length=100, primary_key=True, serialize=False, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('model_name', models.CharField(max_length=255)),
                ('object_id', models.CharField(max_length=10)),
                ('field_name', models.CharField(max_length=255)),
                ('old_value', models.TextField(blank=True, null=True)),
                ('new_value', models.TextField(blank=True, null=True)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('user', models.TextField(blank=True, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Module',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('status', models.CharField(default='Active', max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('id', models.CharField(editable=False, max_length=10, primary_key=True, serialize=False, unique=True)),
                ('app', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='modules', to='core.app')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Document',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('status', models.CharField(default='Active', max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('id', models.CharField(editable=False, max_length=10, primary_key=True, serialize=False, unique=True)),
                ('type', models.CharField(choices=[('single', 'Single'), ('list', 'List'), ('dynamic', 'Dynamic')], default='list', max_length=10)),
                ('app', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='app', to='core.app')),
                ('module', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='modules', to='core.module')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
