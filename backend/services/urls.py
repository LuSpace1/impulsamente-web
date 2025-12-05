from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PsychologyProfesionalsView,
    MethodologyProfessionalsView,
    AdminProfessionalViewSet,
    LoginView,
    LogoutView,
    CheckAuthView,
    ChangePasswordView,
    # --- Vistas de Contacto ---
    ContactCreateView, 
    ContactListView,
    ContactDeleteView,
    ContactReplyView
)

router = DefaultRouter()
router.register(r'admin/professionals', AdminProfessionalViewSet, basename='admin-professionals')

urlpatterns = [
    # --- Rutas Públicas (Lo que ve el usuario) ---
    path('professionals/psychology/', PsychologyProfesionalsView.as_view(), name='psychology-professionals'),
    path('professionals/methodology/', MethodologyProfessionalsView.as_view(), name='methodology-professionals'),
    
    # 1. RUTA PARA EL FORMULARIO (POST) - ¡Esta es la que te falta!
    path('contact/', ContactCreateView.as_view(), name='create-contact'),

    # --- Rutas de Autenticación ---
    path('auth/login/', LoginView.as_view(), name='auth_login'),
    path('auth/logout/', LogoutView.as_view(), name='auth_logout'),
    path('auth/check/', CheckAuthView.as_view(), name='auth_check'),
    path('auth/change-password/', ChangePasswordView.as_view(), name='auth_change_password'),
    
    # --- Rutas de Mensajería (Admin) ---
    # 2. RUTA PARA VER LA BANDEJA (GET)
    path('contact/list/', ContactListView.as_view(), name='contact-list'),
    
    # 3. RUTAS PARA GESTIONAR (DELETE / POST)
    path('contact/<int:pk>/delete/', ContactDeleteView.as_view(), name='delete-contact'),
    path('contact/<int:pk>/reply/', ContactReplyView.as_view(), name='reply-contact'),

    # --- Router del CRUD de Profesionales (Siempre al final) ---
    path('', include(router.urls)),
]
