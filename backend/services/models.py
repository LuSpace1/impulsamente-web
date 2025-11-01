# Importa la base de modelos de Django
from django.db import models

# Clase que define la tabla 'Professional' en la base de datos
class Professional(models.Model):
    """
    Modelo para almacenar la información de los profesionales
    (psicólogos y metodólogos) de ImpulsaMente.
    """
    
    nombre_completo = models.CharField(max_length=200)
    
    titulo_profesional = models.CharField(max_length=200)
    
    especialidad = models.TextField(blank=True, null=True) 
    
    biografia = models.TextField(blank=True, null=True)
    
    foto = models.ImageField(upload_to='profesionales/') #Guarda el nombre de la foto.
    
    años_experiencia = models.IntegerField(blank=True, null=True) 

    calendly_username = models.CharField(max_length=100, unique=True)
    
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
