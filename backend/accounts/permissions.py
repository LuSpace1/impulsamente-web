from rest_framework.permissions import BasePermission


class IsAdminStaff(BasePermission):
    """Permite acceso solo a usuarios autenticados con permisos de staff."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)


class HasUpdatedPassword(BasePermission):
    """Bloquea el acceso si el admin debe cambiar su contraseña."""

    message = "Debe actualizar su contraseña antes de continuar."

    def has_permission(self, request, view):
        user = request.user
        if not (user and user.is_authenticated and hasattr(user, "admin_profile")):
            return False
        return not user.admin_profile.must_change_password
