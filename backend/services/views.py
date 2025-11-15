from django.http import Http404
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Professional
from .serializers import ProfessionalPublicSerializer


class ProfessionalByServiceView(ListAPIView):
    """Devuelve profesionales activos según el tipo de servicio solicitado."""

    serializer_class = ProfessionalPublicSerializer

    def get_queryset(self):
        service = self.kwargs.get("service")
        valid_services = {choice for choice, _ in Professional.TIPO_SERVICIO_CHOICES}
        if service not in valid_services:
            raise Http404("Servicio no encontrado")
        return (
            Professional.objects.filter(tipo_servicio=service, activo=True)
            .order_by("orden", "nombre_completo")
        )


class ActiveProfessionalDetailView(RetrieveAPIView):
    """Devuelve el detalle de un profesional activo."""

    serializer_class = ProfessionalPublicSerializer
    queryset = Professional.objects.filter(activo=True)
