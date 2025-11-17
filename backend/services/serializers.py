from rest_framework import serializers
from .models import Professional, ContactSubmission

class ProfessionalSerializer(serializers.ModelSerializer): #ModelSerializer es una clase base de DRF.
    """
    Serializer para el modelo Professional.
    Serializer se encarga de convertir el modelo a JSON y viceversa.
    """
    foto = serializers.SerializerMethodField()
    class Meta:
        """
        Clase que configura el comportamiento del serializer.
        Define que modelo usa como referencia y que campos incluir.
        """
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
        ]

        def get_foto(self, obj): #Convencion get_nombre_del_campo (Metodo de lectura de campo personalizado que tiene serializer)
            """
            Funcion que devolvera la URL completa de la foto de un profesional.
            Argumentos: self (Instancia de la clase serializer), obj (Instancia del modelo Professional), str (URL completa o none si no tiene foto)
            """
            if obj.foto: #Comprueba si existe la foto.
                request = self.context.get('request') 
                if request:
                    return request.build_absolute_uri(obj.foto.url)
                return obj.foto.url
            return None

class ContactMessageSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo ContactSubmission (Tarea IMP-61).
    """
    class Meta:
        model = ContactSubmission
        fields = ('nombre', 'email', 'servicio_interes', 'mensaje')
        read_only_fields = ('id', 'fecha_creacion', 'leido')