from django.contrib import admin
from .models import Categoria, Producto, Compra, Cliente, Pedido, DetallePedido, Venta

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'descripcion']
    search_fields = ['nombre']

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'precio', 'stock', 'categoria']
    search_fields = ['nombre']
    list_filter = ['categoria']

@admin.register(Compra)
class CompraAdmin(admin.ModelAdmin):
    list_display = ['producto', 'usuario', 'cantidad', 'fecha_compra']
    list_filter = ['fecha_compra']
    search_fields = ['producto__nombre']

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'correo', 'telefono']
    search_fields = ['nombre', 'correo']

# Administración para el modelo Pedido
@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):
    list_display = ['usuario', 'estado', 'total', 'fecha_creacion']
    search_fields = ['usuario__username', 'productos__nombre']
    list_filter = ['estado', 'fecha_creacion']

# Administración para el modelo intermedio DetallePedido
@admin.register(DetallePedido)
class DetallePedidoAdmin(admin.ModelAdmin):
    list_display = ['pedido', 'producto', 'cantidad']
    search_fields = ['pedido__id', 'producto__nombre']

# Administración para el modelo Venta
@admin.register(Venta)
class VentaAdmin(admin.ModelAdmin):
    list_display = ['usuario', 'total', 'fecha_venta']
    search_fields = ['usuario__username']
    list_filter = ['fecha_venta']
