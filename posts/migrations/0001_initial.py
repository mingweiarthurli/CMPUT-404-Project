# Generated by Django 3.0.3 on 2020-03-28 05:07

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('post', models.TextField(default=1)),
                ('comment', models.TextField(blank=True, max_length=2000)),
                ('contentType', models.TextField(choices=[('text/plain', 'text/plain'), ('text/markdown', 'text/markdown'), ('application/base64', 'application/base64'), ('image/png;base64', 'image/png;base64'), ('image/jpeg;base64', 'image/jpeg;base64')], default='text/plain')),
                ('published', models.DateTimeField(auto_now_add=True)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('title', models.CharField(max_length=200)),
                ('source', models.URLField(blank=True)),
                ('origin', models.URLField(blank=True)),
                ('description', models.TextField(blank=True)),
                ('contentType', models.TextField(choices=[('text/plain', 'text/plain'), ('text/markdown', 'text/markdown'), ('application/base64', 'application/base64'), ('image/png;base64', 'image/png;base64'), ('image/jpeg;base64', 'image/jpeg;base64')], default='text/plain')),
                ('content', models.TextField(blank=True, max_length=2000)),
                ('categories', models.TextField(default='[]')),
                ('size', models.IntegerField(default=50)),
                ('next', models.URLField(blank=True)),
                ('published', models.DateTimeField(auto_now_add=True)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('visibility', models.TextField(choices=[('PUBLIC', 'PUBLIC'), ('FOAF', 'FOAF'), ('FRIENDS', 'FRIENDS'), ('PRIVATE', 'PRIVATE'), ('SERVERONLY', 'SERVERONLY')], default='PUBLIC')),
                ('visibleTo', models.TextField(default='[]')),
                ('unlisted', models.BooleanField(default=False)),
            ],
        ),
    ]