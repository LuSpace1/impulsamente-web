from rest_framework.generics import ListAPIView, CreateAPIView #Importamos la clase base de la vista que lista objetos en DRF.
from .models import Professional, ContactSubmission
from .serializers import ProfessionalSerializer, ContactMessageSerializer
#Importamos serializer para convertir los objetos en JSON.

class PsychologyProfesionalsView(ListAPIView):
    """ 
    Vista que devuelve la lista de profesionales de psicología activos.
    Endpoint: GET /api/professionals/psychology/
    Filtros aplicados:
    - tipo_servicio = 'psicologia'
    - activo = True
    Orden: Por campo 'orden' (ascendente) 
    """
    serializer_class = ProfessionalSerializer #Atributo predefinido en las clases de las listas genericas como ListAPIView en donde especificamos nuestro serializer.
    def get_queryset(self): #Usamos get_queryset porque es mas flexible con consultas complejas que queryset().
        """
        Devuelve el conjunto de profesionales filtrados.
        Returns: QuerySet: Profesionales de psicología activos, ordenados.
        """
        return Professional.objects.filter(tipo_servicio = 'psicologia', activo = True).order_by('orden')
    """
    Esta query ORM es equivalente en lenguaje SQL a la siguiente consulta:
    SELECT * FROM professional 
                WHERE tipo_servicio='psicologia' 
                AND activo=True 
                ORDER BY orden
    Finalmente devuelve un response HTTP serializado a JSON.
    """
#Usamos la misma logica para los metodologos.
class MethodologyProfessionalsView(ListAPIView):
    serializer_class = ProfessionalSerializer
    def get_queryset(self):
        return Professional.objects.filter(tipo_servicio='metodologia', activo=True).order_by('orden')
    

class ContactCreateView(CreateAPIView):
    """
    Vista de API para recibir y guardar un envío del formulario de contacto.
    Responde a la Tarea IMP-61.
    """
    queryset = ContactSubmission.objects.all()
    # Usa el serializer que creamos y corregimos
    serializer_class = ContactMessageSerializer
