# Generated by Django 5.1.3 on 2024-11-15 08:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_pedido_imagen'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pedido',
            name='imagen',
            field=models.URLField(default='https://picsum.photos/884/672'),
        ),
    ]
