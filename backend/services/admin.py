from django.contrib import admin
from .models import Professional, ContactSubmission

@admin.register(Professional)
class ProfessionalAdmin(admin.ModelAdmin):
    """
    Configuración para mostrar el modelo Professional en el admin.
    Sigue las especificaciones de la tarea IMP-10.
    """
    list_display = (
        'nombre_completo', 
        'tipo_servicio', 
        'activo',
        'orden', 
    )
    list_filter = ('tipo_servicio', 'activo')
    search_fields = ('nombre_completo', 'especialidad')
    ordering = ('orden', 'nombre_completo')

@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    """
    Configuración del Admin para los envíos del formulario de contacto.
    """
    list_display = ('nombre', 'email', 'fecha_creacion', 'leido')
    list_filter = ('leido', 'fecha_creacion')
    search_fields = ('nombre', 'email', 'mensaje')
    readonly_fields = ('nombre', 'email', 'mensaje', 'fecha_creacion') 
    list_per_page = 25

    def has_add_permission(self, request):
        return False