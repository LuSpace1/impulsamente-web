from rest_framework import serializers
from .models import Professional

class ProfessionalSerializer(serializers.ModelSerializer): #ModelSerializer es una clase base de DRF.
    """
    Serializer para el modelo Professional.
    Serializer se encarga de convertir el modelo a JSON y viceversa.
    """
    class Meta:
        """
        Clase que configura el comportamiento del serializer.
        Define que modelo usa como referencia y que campos incluir.
        """
        #Campo personalizado para devoler la URL que necesita react ya que en models.py solo entrega el nombre.
        foto = serializers.SerializerMethodField()
        model = Professional
        #Los campos que si se incluiran en el JSON. (Comparar con el modelo en services/models.py)
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
                request = self.context.get('request') #self (serializer) recibe contexto de la peticion HTTP actual.
                if request:
                    return request.build_absolute_uri(obj.foto.url) # request.build_absolute_uri() es un metodo/funcion del ojeto HttpRequest que devuelve la URL absoluta.
                #Ruta alternativa si no hay request en el contexto.
                return obj.foto.url
            return None
