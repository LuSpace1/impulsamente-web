from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PsychologyProfesionalsView,
    MethodologyProfessionalsView,
    AdminProfessionalViewSet,
    LoginView,
    LogoutView,
    CheckAuthView,
    ChangePasswordView
)

router = DefaultRouter()
router.register(r'admin/professionals', AdminProfessionalViewSet,
                basename='admin-professionals')

urlpatterns = [
    # --- Rutas Públicas ---
    path('professionals/psychology/', PsychologyProfesionalsView.as_view(),
         name='psychology-professionals'),
    path('professionals/methodology/', MethodologyProfessionalsView.as_view(),
         name='methodology-professionals'),

    # --- Rutas de Autenticación ---
    path('auth/login/', LoginView.as_view(), name='auth_login'),
    path('auth/logout/', LogoutView.as_view(), name='auth_logout'),
    path('auth/check/', CheckAuthView.as_view(), name='auth_check'),
    path('auth/change-password/', ChangePasswordView.as_view(),
         name='auth_change_password'),

    # --- Rutas del Admin (CRUD) ---
    path('', include(router.urls)),
]
