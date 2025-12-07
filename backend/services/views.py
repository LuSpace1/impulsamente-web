from rest_framework.generics import ListAPIView, CreateAPIView, DestroyAPIView
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import SessionAuthentication
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Professional, CustomUser, ContactSubmission
from .serializers import ProfessionalSerializer, ProfessionalCRUDSerializer, ContactMessageSerializer
from django.core.mail import send_mail  
from django.conf import settings        
from django.shortcuts import get_object_or_404


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


class ContactCreateView(CreateAPIView):
    """
    Vista de API para recibir y guardar un envío del formulario de contacto.
    Permite el método POST sin autenticación.
    """
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny] 


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

            must_change = user.password_must_change

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
            must_change = request.user.password_must_change
            return Response({
                'authenticated': True,
                'username': request.user.username,
                'must_change_password': must_change
            })
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

        user.password_must_change = False
        user.save()

        login(request, user)
        return Response({'success': True})


class ContactListView(ListAPIView):
    """
    Vista exclusiva para administradores.
    Devuelve la lista de todos los mensajes de contacto recibidos.
    Endpoint: GET /api/contact/list/
    """
    queryset = ContactSubmission.objects.all().order_by('-fecha_creacion')
    serializer_class = ContactMessageSerializer
    permission_classes = [IsAuthenticated]

class ContactDeleteView(DestroyAPIView):
    queryset = ContactSubmission.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = (CsrfExemptSessionAuthentication,)

# --- PROTOTIPO DE RESPUESTA (SIMULACIÓN) ---
class ContactReplyView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = (CsrfExemptSessionAuthentication,)

    def post(self, request, pk):
        contact_submission = get_object_or_404(ContactSubmission, pk=pk)
        
        subject = request.data.get('subject')
        message_body = request.data.get('message')

        if not subject or not message_body:
            return Response({'error': 'Asunto y mensaje son obligatorios'}, status=status.HTTP_400_BAD_REQUEST)

        # --- SIMULACIÓN DEL ENVÍO ---
        print("========================================")
        print(f"🚀 [PROTOTIPO] Enviando respuesta a: {contact_submission.email}")
        print(f"📧 Asunto: {subject}")
        print(f"📝 Mensaje: {message_body}")
        print("========================================")
        
        # Marcamos como 'leído' para indicar que ya se gestionó
        contact_submission.leido = True
        contact_submission.save()

        # Simulamos un pequeño retraso o éxito inmediato
        return Response({'success': True, 'message': 'Respuesta registrada en el sistema (Simulación)'})