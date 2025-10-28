# backend/services/admin.py
from django.contrib import admin
from .models import Professional # Importa tu modelo

# Usa el decorador para registrar y configurar el modelo en el admin
@admin.register(Professional)
class ProfessionalAdmin(admin.ModelAdmin):
    """
    Configuración para mostrar el modelo Professional en el admin.
    Sigue las especificaciones de la tarea IMP-10.
    """
    # Columnas a mostrar en la lista principal
    list_display = (
        'nombre_completo', 
        'tipo_servicio', 
        'activo',
        'orden', 
    )
    # Filtros que aparecerán en la barra lateral derecha
    list_filter = ('tipo_servicio', 'activo')
    # Campos por los que se podrá buscar usando la barra de búsqueda
    search_fields = ('nombre_completo', 'especialidad')
    # Orden por defecto de la lista
    ordering = ('orden', 'nombre_completo')