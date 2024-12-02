from django.contrib import admin
from django.urls import path, include
from django.conf import settings  # Importa settings aquí
from django.conf.urls.static import static  # Asegúrate de incluir 'static'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # Incluye las rutas de tu aplicación 'api'
]

# Solo añade la configuración de media en modo DEBUG
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
