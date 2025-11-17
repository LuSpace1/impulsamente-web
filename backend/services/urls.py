from django.urls import path
from .views import PsychologyProfesionalsView, MethodologyProfessionalsView, ContactCreateView

# .as_view() convierte la clase en una vista funcional (Vista basada en funciones) que Django puede ejecutar al recibir la solicitud HTTP.
urlpatterns = [
    path('professionals/psychology/', PsychologyProfesionalsView.as_view(), name='psychology-professionals'),
    path('professionals/methodology/', MethodologyProfessionalsView.as_view(), name='methodology-professionals'),
    path('contact/', ContactCreateView.as_view(), name='crear-contacto'),
]