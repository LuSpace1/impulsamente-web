from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import SessionAuthentication
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from .models import Professional, UserProfile
from .serializers import ProfessionalSerializer, ProfessionalCRUDSerializer


class CsrfExemptSessionAuthentication(SessionAuthentication):
    """
    Clase personalizada que desactiva la validación CSRF de DRF
    pero mantiene la sesión del usuario activa.
    """

    def enforce_csrf(self, request):
        return 


class PsychologyProfesionalsView(ListAPIView):
    serializer_class = ProfessionalSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Professional.objects.filter(tipo_servicio='psicologia', activo=True).order_by('orden')


class MethodologyProfessionalsView(ListAPIView):
    serializer_class = ProfessionalSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Professional.objects.filter(tipo_servicio='metodologia', activo=True).order_by('orden')


class AdminProfessionalViewSet(ModelViewSet):
    queryset = Professional.objects.all().order_by('orden')
    permission_classes = [IsAuthenticated]
    authentication_classes = (CsrfExemptSessionAuthentication,)

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ProfessionalCRUDSerializer
        return ProfessionalSerializer



@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)

            must_change = False
            try:
                profile = UserProfile.objects.get(user=user)
                must_change = profile.password_must_change
            except UserProfile.DoesNotExist:
                pass

            return Response({
                'success': True,
                'username': user.username,
                'must_change_password': must_change
            })
        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)



class LogoutView(APIView):
    authentication_classes = (CsrfExemptSessionAuthentication,)

    def post(self, request):
        logout(request)
        return Response({'success': True})



class CheckAuthView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            must_change = False
            try:
                profile = UserProfile.objects.get(user=request.user)
                must_change = profile.password_must_change
            except UserProfile.DoesNotExist:
                pass
            return Response({'authenticated': True, 'username': request.user.username, 'must_change_password': must_change})
        return Response({'authenticated': False})



class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = (CsrfExemptSessionAuthentication,)

    def post(self, request):
        user = request.user
        current_password = request.data.get('current_password')
        new_password = request.data.get('new_password')

        if not user.check_password(current_password):
            return Response({'error': 'La contraseña actual es incorrecta'}, status=status.HTTP_400_BAD_REQUEST)

        if len(new_password) < 8:
            return Response({'error': 'La contraseña debe tener mínimo 8 caracteres'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        profile, created = UserProfile.objects.get_or_create(user=user)
        profile.password_must_change = False
        profile.save()

        login(request, user)
        return Response({'success': True})
