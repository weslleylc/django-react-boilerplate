# Generated by Django 3.1.5 on 2021-01-04 16:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sentiment_api', '0008_auto_20210104_1621'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='reply_set', to='sentiment_api.comment'),
        ),
    ]
