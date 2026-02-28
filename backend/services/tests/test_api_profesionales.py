import pytest
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient

from ..models import Professional

User = get_user_model()


@pytest.mark.django_db
def test_api_publica_lista_profesionales():
    """Cualquiera debe poder ver la lista de profesionales (API Pública)"""
    client = APIClient()
    Professional.objects.create(
        nombre_completo="Visible",
        calendly_username="v1",
        tipo_servicio="psicologia",
        activo=True,
    )

    response = client.get("/api/professionals/psychology/")

    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) >= 1


@pytest.mark.django_db
def test_validacion_datos_incorrectos():
    """
    Simula el envío de un formulario con datos erróneos (ej: texto en campo numérico).
    """
    client = APIClient()
    admin_user = User.objects.create_superuser(username="admin_test", password="123")
    client.force_authenticate(user=admin_user)

    data_invalida = {
        "titulo_profesional": "Tester",
        "calendly_username": "test-fail",
        "tipo_servicio": "psicologia",
        "años_experiencia": "cinco",
    }

    response = client.post("/api/admin/professionals/", data_invalida)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert Professional.objects.filter(calendly_username="test-fail").exists() is False


@pytest.mark.django_db
def test_unicidad_credenciales_calendly():
    """
    Verifica la Integridad de Datos: No pueden existir dos profesionales
    con el mismo calendly_username.
    """
    client = APIClient()
    admin_user = User.objects.create_superuser(username="admin_test_2", password="123")
    client.force_authenticate(user=admin_user)

    Professional.objects.create(
        nombre_completo="Profesional Original",
        titulo_profesional="Psicólogo",
        calendly_username="soy-unico",
        tipo_servicio="psicologia",
        orden=1,
    )

    data_duplicada = {
        "nombre_completo": "Profesional Copia",
        "titulo_profesional": "Otro",
        "calendly_username": "soy-unico",
        "tipo_servicio": "metodologia",
        "orden": 2,
    }

    response = client.post("/api/admin/professionals/", data_duplicada)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "calendly_username" in response.data


@pytest.mark.django_db
def test_falla_logica_anos_negativos():
    """
    Intentamos crear un profesional con años de experiencia negativos.
    """
    client = APIClient()
    admin_user = User.objects.create_superuser(
        username="admin_logic_fail", password="123"
    )
    client.force_authenticate(user=admin_user)

    data_illogical = {
        "nombre_completo": "Benjamin Button",
        "titulo_profesional": "Viajero del Tiempo",
        "calendly_username": "benjamin-button",
        "tipo_servicio": "psicologia",
        "años_experiencia": -10,
    }

    response = client.post("/api/admin/professionals/", data_illogical)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
