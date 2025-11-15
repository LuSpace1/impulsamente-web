from rest_framework import serializers

from .models import Professional


class BaseProfessionalSerializer(serializers.ModelSerializer):
    foto_url = serializers.SerializerMethodField(read_only=True)
    años_experiencia = serializers.IntegerField(required=False, allow_null=True)

    class Meta:
        model = Professional
        fields = [
            "id",
            "nombre_completo",
            "titulo_profesional",
            "especialidad",
            "biografia",
            "foto",
            "foto_url",
            "años_experiencia",
            "calendly_url",
            "tipo_servicio",
            "activo",
            "orden",
        ]
        read_only_fields = ["foto_url"]
        extra_kwargs = {
            "foto": {"required": False, "allow_null": True},
            "especialidad": {"required": False, "allow_blank": True},
            "biografia": {"required": False, "allow_blank": True},
            "años_experiencia": {"required": False, "allow_null": True},
        }

    def get_foto_url(self, obj):
        if obj.foto:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.foto.url)
            return obj.foto.url
        return None


class ProfessionalPublicSerializer(BaseProfessionalSerializer):
    class Meta(BaseProfessionalSerializer.Meta):
        fields = [
            "id",
            "nombre_completo",
            "titulo_profesional",
            "especialidad",
            "biografia",
            "foto_url",
            "años_experiencia",
            "calendly_url",
            "tipo_servicio",
        ]


class ProfessionalAdminSerializer(BaseProfessionalSerializer):
    pass
