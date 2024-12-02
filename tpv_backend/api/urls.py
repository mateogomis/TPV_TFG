# api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LoginView, user_profile_view, CategoriaViewSet, ProductoViewSet, CompraViewSet, ClienteViewSet
from .views import PedidoViewSet
from .views import VentaViewSet


router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet, basename='categoria')
router.register(r'productos', ProductoViewSet, basename='producto')
router.register(r'compras', CompraViewSet, basename='compra')
router.register(r'clientes', ClienteViewSet, basename='cliente')
router.register(r'pedidos', PedidoViewSet, basename='pedido')
router.register(r'ventas', VentaViewSet, basename='venta')


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('user-profile/', user_profile_view, name='user-profile'),
    path('', include(router.urls)),
]
