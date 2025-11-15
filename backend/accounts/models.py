from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class AdminProfile(models.Model):
    """Perfil adicional para cuentas administrativas internas."""

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="admin_profile",
    )
    must_change_password = models.BooleanField(default=True)
    active_session_key = models.CharField(max_length=40, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Perfil de administrador"
        verbose_name_plural = "Perfiles de administradores"

    def __str__(self) -> str:  # pragma: no cover - representación simple
        return f"Perfil admin de {self.user.get_username()}"


@receiver(post_save, sender=get_user_model())
def ensure_admin_profile(sender, instance, created, **kwargs):
    """Crea o actualiza el perfil para usuarios administradores."""

    if instance.is_staff:
        AdminProfile.objects.get_or_create(user=instance)
    else:
        # Si deja de ser staff, eliminamos el perfil para evitar datos huérfanos.
        AdminProfile.objects.filter(user=instance).delete()
