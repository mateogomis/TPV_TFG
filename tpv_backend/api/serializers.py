from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Categoria, Producto, Compra, Cliente
from .models import Pedido, DetallePedido
from rest_framework import serializers
from .models import Venta, DetalleVenta

class DetalleVentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleVenta
        fields = ['producto', 'cantidad']

class VentaSerializer(serializers.ModelSerializer):
    productos = DetalleVentaSerializer(many=True, write_only=True)
    total = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Venta
        fields = ['id', 'usuario', 'productos', 'total', 'fecha_venta']

    def create(self, validated_data):
        productos_data = validated_data.pop('productos')
        venta = Venta.objects.create(**validated_data)
        for producto_data in productos_data:
            DetalleVenta.objects.create(
                venta=venta,
                producto=producto_data['producto'],
                cantidad=producto_data['cantidad']
            )
        venta.total = sum(
            detalle.cantidad * detalle.producto.precio for detalle in venta.detalleventa_set.all()
        )
        venta.save()
        return venta


class DetallePedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetallePedido
        fields = ['producto', 'cantidad']

class PedidoSerializer(serializers.ModelSerializer):
    productos = DetallePedidoSerializer(many=True, write_only=True)
    total = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Pedido
        fields = ['id', 'usuario', 'productos', 'estado', 'total', 'fecha_creacion', 'imagen']

    def create(self, validated_data):
        productos_data = validated_data.pop('productos')
        pedido = Pedido.objects.create(**validated_data)
        for producto_data in productos_data:
            DetallePedido.objects.create(
                pedido=pedido,
                producto=producto_data['producto'],  # Asegurarse de que producto esté en este formato
                cantidad=producto_data['cantidad']
            )
        pedido.calcular_total()
        return pedido



class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class CompraSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(read_only=True)
    producto_id = serializers.PrimaryKeyRelatedField(queryset=Producto.objects.all(), source='producto')

    class Meta:
        model = Compra
        fields = ['id', 'producto', 'producto_id', 'cantidad', 'fecha_compra', 'usuario']

class ClienteSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)

    class Meta:
        model = Cliente
        fields = '__all__'

    def create(self, validated_data):
        if 'user' not in validated_data:
            validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data.pop('user', None)
        return super().update(instance, validated_data)
