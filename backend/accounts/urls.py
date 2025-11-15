from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    AdminLoginView,
    AdminLogoutView,
    AdminPasswordChangeView,
    AdminSessionView,
    CSRFTokenView,
    ProfessionalAdminViewSet,
)

router = DefaultRouter()
router.register("professionals", ProfessionalAdminViewSet, basename="admin-professionals")

urlpatterns = [
    path("csrf/", CSRFTokenView.as_view(), name="admin-csrf"),
    path("login/", AdminLoginView.as_view(), name="admin-login"),
    path("logout/", AdminLogoutView.as_view(), name="admin-logout"),
    path("session/", AdminSessionView.as_view(), name="admin-session"),
    path("password/change/", AdminPasswordChangeView.as_view(), name="admin-password-change"),
    path("", include(router.urls)),
]
