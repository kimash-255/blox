# Generated by Django 4.2.5 on 2024-07-23 10:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_document'),
    ]

    operations = [
        migrations.AlterField(
            model_name='app',
            name='status',
            field=models.CharField(default='Active', max_length=255),
        ),
        migrations.AlterField(
            model_name='document',
            name='status',
            field=models.CharField(default='Active', max_length=255),
        ),
        migrations.AlterField(
            model_name='module',
            name='status',
            field=models.CharField(default='Active', max_length=255),
        ),
    ]
