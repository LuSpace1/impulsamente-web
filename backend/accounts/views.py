from django.conf import settings
from django.contrib.auth import login, logout, update_session_auth_hash
from django.contrib.sessions.models import Session
from django.middleware.csrf import get_token
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from services.models import Professional
from services.serializers import ProfessionalAdminSerializer

from .models import AdminProfile
from .permissions import HasUpdatedPassword, IsAdminStaff
from .serializers import AdminLoginSerializer, AdminPasswordChangeSerializer


class CSRFTokenView(APIView):
    """Devuelve y refresca el token CSRF necesario para sesiones seguras."""

    permission_classes = [AllowAny]

    def get(self, request):
        token = get_token(request)
        return Response({"csrfToken": token})


class AdminLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = AdminLoginSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        request.session.set_expiry(settings.SESSION_COOKIE_AGE)
        request.session.save()

        profile, _ = AdminProfile.objects.get_or_create(user=user)
        current_session_key = request.session.session_key
        previous_session_key = profile.active_session_key
        if previous_session_key and previous_session_key != current_session_key:
            Session.objects.filter(session_key=previous_session_key).delete()
        profile.active_session_key = current_session_key
        profile.save(update_fields=["active_session_key"])
        request.session["force_password_change"] = profile.must_change_password

        return Response(
            {
                "username": user.get_username(),
                "must_change_password": profile.must_change_password,
            },
            status=status.HTTP_200_OK,
        )


class AdminLogoutView(APIView):
    permission_classes = [IsAdminStaff]

    def post(self, request):
        profile, _ = AdminProfile.objects.get_or_create(user=request.user)
        current_session_key = request.session.session_key
        if profile.active_session_key == current_session_key:
            profile.active_session_key = None
            profile.save(update_fields=["active_session_key"])
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)


class AdminSessionView(APIView):
    permission_classes = [IsAdminStaff]

    def get(self, request):
        profile, _ = AdminProfile.objects.get_or_create(user=request.user)
        return Response(
            {
                "username": request.user.get_username(),
                "must_change_password": profile.must_change_password,
            }
        )


class AdminPasswordChangeView(APIView):
    permission_classes = [IsAdminStaff]

    def post(self, request):
        serializer = AdminPasswordChangeSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        update_session_auth_hash(request, user)
        request.session["force_password_change"] = False
        return Response({"detail": "Contraseña actualizada correctamente."})


class ProfessionalAdminViewSet(viewsets.ModelViewSet):
    """CRUD completo de profesionales para el panel interno."""

    serializer_class = ProfessionalAdminSerializer
    queryset = Professional.objects.all().order_by("orden", "nombre_completo")
    permission_classes = [IsAdminStaff, HasUpdatedPassword]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        queryset = super().get_queryset()
        active_param = self.request.query_params.get("active")
        if active_param is not None:
            if active_param.lower() == "true":
                queryset = queryset.filter(activo=True)
            elif active_param.lower() == "false":
                queryset = queryset.filter(activo=False)
        service_param = self.request.query_params.get("service")
        if service_param:
            queryset = queryset.filter(tipo_servicio=service_param)
        return queryset

    def perform_create(self, serializer):
        serializer.save()

    @action(detail=True, methods=["post"], permission_classes=[IsAdminStaff, HasUpdatedPassword])
    def toggle_active(self, request, pk=None):
        professional = self.get_object()
        professional.activo = not professional.activo
        professional.save(update_fields=["activo"])
        return Response(
            {
                "id": professional.pk,
                "activo": professional.activo,
            }
        )
