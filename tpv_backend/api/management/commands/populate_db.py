import random
from django.core.management.base import BaseCommand
from faker import Faker
from django.contrib.auth.models import User
from api.models import Categoria, Producto, Compra, Cliente, Pedido, DetallePedido

fake = Faker()

class Command(BaseCommand):
    help = 'Puebla la base de datos con datos ficticios usando Faker'

    def handle(self, *args, **kwargs):
        # Crear categorías
        for _ in range(5):
            Categoria.objects.create(
                nombre=fake.word(),
                descripcion=fake.text()
            )

        categorias = Categoria.objects.all()

        # Crear productos
        for _ in range(20):
            Producto.objects.create(
                nombre=fake.word(),
                precio=round(random.uniform(10.0, 100.0), 2),
                descripcion=fake.text(),
                stock=random.randint(1, 50),
                categoria=random.choice(categorias)
            )

        # Crear usuarios y clientes
        for _ in range(10):
            user = User.objects.create_user(
                username=fake.user_name(),
                password='password123'
            )
            Cliente.objects.create(
                user=user,
                nombre=fake.name(),
                correo=fake.email(),
                telefono=fake.phone_number(),
                direccion=fake.address()
            )

        # Crear compras
        productos = Producto.objects.all()
        clientes = Cliente.objects.all()

        for _ in range(30):
            Compra.objects.create(
                producto=random.choice(productos),
                usuario=random.choice(clientes).user,
                cantidad=random.randint(1, 5),
                fecha_compra=fake.date_time_this_year()
            )

        # Crear pedidos con detalles
        usuarios = User.objects.all()
        for _ in range(10):
            usuario = random.choice(usuarios)
            pedido = Pedido.objects.create(
                usuario=usuario,
                estado=random.choice(['pendiente', 'procesando', 'enviado', 'entregado']),
                imagen=fake.image_url()  # Generar una URL de imagen para el pedido
            )
            # Agregar detalles de pedido
            for _ in range(random.randint(1, 5)):
                DetallePedido.objects.create(
                    pedido=pedido,
                    producto=random.choice(productos),
                    cantidad=random.randint(1, 5)
                )
            # Calcular el total del pedido después de agregar todos los detalles
            pedido.calcular_total()

        self.stdout.write(self.style.SUCCESS('Datos ficticios creados exitosamente'))
