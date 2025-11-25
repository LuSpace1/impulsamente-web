# backend/services/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Professional, ContactSubmission,CustomUser # Importa tu modelo

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

@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    """
    Bandeja de entrada para ver los mensajes recibidos desde la web.
    """
    # Qué columnas ver en la lista
    list_display = ('nombre', 'email', 'servicio_interes', 'fecha_creacion', 'leido')
    
    # Filtros laterales (Útil para ver solo los no leídos o por servicio)
    list_filter = ('leido', 'servicio_interes', 'fecha_creacion')
    
    # Buscador
    search_fields = ('nombre', 'email', 'mensaje')
    
    # Campos de solo lectura (Para no alterar lo que escribió el cliente)
    readonly_fields = ('nombre', 'email', 'servicio_interes', 'mensaje', 'fecha_creacion')
    
    # Paginación
    list_per_page = 25

    # Desactivar el botón "Agregar" (Los mensajes solo llegan desde el formulario web)
    def has_add_permission(self, request):
        return False
    
@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    # Agregamos 'password_must_change' al formulario de edición
    fieldsets = UserAdmin.fieldsets + (
        ('Seguridad Extra', {'fields': ('password_must_change',)}),
    )
    # Agregarlo también al formulario de creación
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Seguridad Extra', {'fields': ('password_must_change',)}),
    )
