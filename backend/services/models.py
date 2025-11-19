from django.db import models
from django.contrib.auth.models import User

class Professional(models.Model):
    nombre_completo = models.CharField(max_length=200)
    titulo_profesional = models.CharField(max_length=200)
    especialidad = models.TextField(blank=True, null=True)
    biografia = models.TextField(blank=True, null=True)
    foto = models.ImageField(upload_to='profesionales/')
    años_experiencia = models.IntegerField(blank=True, null=True)
    calendly_username = models.CharField(max_length=100, unique=True)
    TIPO_SERVICIO_CHOICES = [
        ('psicologia', 'Psicología'),
        ('metodologia', 'Metodología'),
    ]
    tipo_servicio = models.CharField(
        max_length=20,
        choices=TIPO_SERVICIO_CHOICES
    )
    activo = models.BooleanField(default=True)
    orden = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre_completo

    class Meta:
        ordering = ['orden', 'nombre_completo']
        verbose_name = "Profesional"
        verbose_name_plural = "Profesionales"


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    password_must_change = models.BooleanField(default=True)

    def __str__(self):
        return f"Perfil de {self.user.username}"
