# Importa la base de modelos de Django
from django.db import models

# Clase que define la tabla 'Professional' en la base de datos
class Professional(models.Model):
    """
    Modelo para almacenar la información de los profesionales
    (psicólogos y metodólogos) de ImpulsaMente, basado en la tarea IMP-8.
    """
    
    # --- Campos especificados EXACTAMENTE como en la imagen IMP-8 ---
    
    nombre_completo = models.CharField(max_length=200)
    
    titulo_profesional = models.CharField(max_length=200)
    
    # TextField permite texto largo. blank=True y null=True son buenas prácticas
    # si no son obligatorios, aunque no lo especifique la imagen.
    especialidad = models.TextField(blank=True, null=True) 
    
    biografia = models.TextField(blank=True, null=True)
    
    # ImageField requiere configurar MEDIA_URL y MEDIA_ROOT en settings.py
    foto = models.ImageField(upload_to='profesionales/') 
    
    años_experiencia = models.IntegerField(blank=True, null=True) # Lo hacemos opcional
                                       
    calendly_username = models.CharField(max_length=100, unique=True)
    
    # Definimos las opciones directamente como pide la imagen
    TIPO_SERVICIO_CHOICES = [
        ('psicologia', 'Psicología'),
        ('metodologia', 'Metodología'),
    ]
    tipo_servicio = models.CharField(
        max_length=20, # Longitud suficiente para 'psicologia' o 'metodologia'
        choices=TIPO_SERVICIO_CHOICES
    )
    
    activo = models.BooleanField(default=True)
    
    orden = models.IntegerField(default=0) 
    
    created_at = models.DateTimeField(auto_now_add=True) # Se establece solo al crear
    
    updated_at = models.DateTimeField(auto_now=True) # Se actualiza al guardar

    # --- Método __str__ como pide la imagen ---
    def __str__(self):
        """
        Retorna el nombre completo del profesional.
        """
        return self.nombre_completo

    # --- Metadatos del Modelo (Opcional pero recomendado) ---
    class Meta:
        # Orden por defecto al consultar
        ordering = ['orden', 'nombre_completo'] 
        # Nombres legibles en el Admin
        verbose_name = "Profesional"
        verbose_name_plural = "Profesionales"
