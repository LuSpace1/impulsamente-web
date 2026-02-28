import pytest
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient

User = get_user_model()


@pytest.mark.django_db
def test_api_admin_bloquea_anonimos():
    """Un usuario NO logueado NO debe poder crear profesionales"""
    client = APIClient()

    data = {
        "nombre_completo": "Hacker",
        "titulo_profesional": "Fake",
        "calendly_username": "hacker",
        "tipo_servicio": "psicologia",
    }

    response = client.post("/api/admin/professionals/", data)

    assert response.status_code in [
        status.HTTP_401_UNAUTHORIZED,
        status.HTTP_403_FORBIDDEN,
    ]
