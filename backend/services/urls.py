from django.urls import path

from .views import ActiveProfessionalDetailView, ProfessionalByServiceView

urlpatterns = [
    path(
        "professionals/<str:service>/",
        ProfessionalByServiceView.as_view(),
        name="professionals-by-service",
    ),
    path(
        "professionals/<int:pk>/",
        ActiveProfessionalDetailView.as_view(),
        name="professional-detail",
    ),
]
