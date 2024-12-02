# Generated by Django 5.1.3 on 2024-11-15 10:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_pedido_estado_alter_pedido_imagen_detalleventa_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='imagen',
            field=models.ImageField(blank=True, null=True, upload_to='productos/'),
        ),
        migrations.AlterField(
            model_name='pedido',
            name='imagen',
            field=models.URLField(default='https://placekitten.com/431/802'),
        ),
    ]
