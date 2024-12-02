from django.db import models
from django.contrib.auth.models import User
from faker import Faker

fake = Faker()

class Venta(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    productos = models.ManyToManyField('Producto', through='DetalleVenta')
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    fecha_venta = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Venta {self.id} - Usuario: {self.usuario.username}'

class DetalleVenta(models.Model):
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE)
    producto = models.ForeignKey('Producto', on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.cantidad} x {self.producto.nombre} en Venta {self.venta.id}'

# Modelo de Categoria
class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre

# Modelo de Producto
class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()
    stock = models.IntegerField()
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, default=1)
    imagen = models.ImageField(upload_to='productos/', null=True, blank=True)  # Nuevo campo para la imagen

    def __str__(self):
        return self.nombre

# Modelo de Compra
class Compra(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    fecha_compra = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.cantidad} {self.producto.nombre} comprados por {self.usuario.username}'

# Modelo de Cliente
class Cliente(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    telefono = models.CharField(max_length=15, null=True, blank=True)
    direccion = models.TextField(null=True, blank=True)

    def __str__(self):
        return f'{self.nombre} ({self.correo})'

# Modelo de Pedido
class Pedido(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    productos = models.ManyToManyField(Producto, through='DetallePedido')
    estado = models.CharField(max_length=20, choices=[('pendiente', 'Pendiente'), ('procesando', 'Procesando'), ('enviado', 'Entregado')], default='pendiente')
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    imagen = models.URLField(default=fake.image_url())

    def calcular_total(self):
        total = sum(detalle.cantidad * detalle.producto.precio for detalle in self.detallepedido_set.all())
        self.total = total
        self.save()

# Modelo de DetallePedido
class DetallePedido(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.cantidad} x {self.producto.nombre} en Pedido {self.pedido.id}'
