from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from .models import AdminProfile


class AdminLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True, style={"input_type": "password"})

    def validate(self, attrs):
        request = self.context.get("request")
        username = attrs.get("username")
        password = attrs.get("password")

        if username and password:
            user = authenticate(request=request, username=username, password=password)
            if user is None:
                msg = _("Credenciales inválidas. Verifique usuario y contraseña.")
                raise serializers.ValidationError(msg, code="authorization")
            if not user.is_staff:
                raise serializers.ValidationError(
                    _("Esta cuenta no tiene permisos para acceder al panel."),
                    code="authorization",
                )
        else:
            raise serializers.ValidationError(
                _("Debe ingresar usuario y contraseña."),
                code="authorization",
            )

        attrs["user"] = user
        return attrs


class AdminPasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True, style={"input_type": "password"})
    new_password = serializers.CharField(write_only=True, style={"input_type": "password"})
    confirm_password = serializers.CharField(write_only=True, style={"input_type": "password"})

    def validate_old_password(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError(_("La contraseña actual no es correcta."))
        return value

    def validate(self, attrs):
        new_password = attrs.get("new_password")
        confirm_password = attrs.get("confirm_password")
        if new_password != confirm_password:
            raise serializers.ValidationError(_("Las contraseñas nuevas no coinciden."))
        validate_password(new_password, user=self.context["request"].user)
        return attrs

    def save(self):
        request = self.context["request"]
        user = request.user
        new_password = self.validated_data["new_password"]
        user.set_password(new_password)
        user.save(update_fields=["password"])
        profile, _ = AdminProfile.objects.get_or_create(user=user)
        profile.must_change_password = False
        profile.save(update_fields=["must_change_password"])
        return user
