from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.http import JsonResponse
from faker import Faker
from .models import Categoria, Producto, Compra, Cliente, Pedido
from .serializers import CategoriaSerializer, ProductoSerializer, CompraSerializer, ClienteSerializer, PedidoSerializer
from .models import Venta
from .serializers import VentaSerializer
from rest_framework import viewsets
from .models import Producto
from .serializers import ProductoSerializer

fake = Faker()
class VentaViewSet(viewsets.ModelViewSet):
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
        
# Vista para el manejo de pedidos
class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Guardar el pedido con el usuario que lo está creando
        serializer.save(usuario=self.request.user)

    def perform_update(self, serializer):
        # Actualizar el usuario si se cambia en el pedido
        serializer.save(usuario=self.request.user)

# Vista para obtener un perfil de usuario ficticio con una imagen válida
def user_profile_view(request):
    data = {
        'username': fake.user_name(),
        'name': fake.name(),
        'profile_picture': fake.image_url()  # Genera una URL de imagen aleatoria
    }
    return JsonResponse(data)

# Vista para la gestión de categorías con permisos
class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [IsAuthenticated]

# Vista para la gestión de productos con filtrado por categoría
class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Permite filtrar productos por categoría utilizando el parámetro `?categoria=<nombre_categoria>`
        """
        queryset = super().get_queryset()
        categoria_nombre = self.request.query_params.get('categoria', None)
        if categoria_nombre:
            queryset = queryset.filter(categoria__nombre=categoria_nombre)
        return queryset

# Vista para la gestión de compras con permisos
class CompraViewSet(viewsets.ModelViewSet):
    queryset = Compra.objects.all()
    serializer_class = CompraSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        print("Estamos en compras", self.request.data)
        serializer.save(usuario=self.request.user)

    def perform_update(self, serializer):
        serializer.save(usuario=self.request.user)

# Vista para la gestión de clientes con permisos
class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

# Vista para el registro de usuarios
class RegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Usuario ya existe'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.create_user(username=username, password=password)
        user.save()
        return Response({'mensaje': 'Usuario creado correctamente'}, status=status.HTTP_201_CREATED)

# Vista para el inicio de sesión usando JWT
class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]
