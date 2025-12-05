from rest_framework import serializers
from .models import Professional, ContactSubmission


class ProfessionalSerializer(serializers.ModelSerializer):
    """
    Serializer de LECTURA (Para mostrar datos en la web y dashboard)
    """
    foto = serializers.SerializerMethodField()

    class Meta:
        model = Professional
        fields = [
            'id',
            'nombre_completo',
            'titulo_profesional',
            'especialidad',
            'biografia',
            'foto',
            'años_experiencia',
            'calendly_username',
            'tipo_servicio',
            'activo',
            'orden'
        ]

    def get_foto(self, obj):
        if obj.foto:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.foto.url)
            return obj.foto.url
        return None


class ProfessionalCRUDSerializer(serializers.ModelSerializer):
    """
    Serializer de ESCRITURA (Para Crear y Editar)
    """
    foto = serializers.ImageField(required=False)

    class Meta:
        model = Professional
        fields = '__all__'

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['id', 'nombre', 'email', 'servicio_interes', 'mensaje', 'fecha_creacion', 'leido']
        read_only_fields = ['fecha_creacion', 'leido']
