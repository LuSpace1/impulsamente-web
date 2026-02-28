import pytest
from ..models import Professional


@pytest.mark.django_db
def test_crear_profesional_exitoso():
    """Verifica que se puede crear un profesional correctamente en la BD"""
    prof = Professional.objects.create(
        nombre_completo="Ana Test",
        titulo_profesional="Psicóloga",
        tipo_servicio="psicologia",
        calendly_username="ana-test",
        orden=1,
    )
    assert prof.nombre_completo == "Ana Test"
    assert prof.activo is True


@pytest.mark.django_db
def test_str_metodo_profesional():
    """Verifica que el método __str__ devuelva el nombre"""
    prof = Professional.objects.create(
        nombre_completo="Juan Test",
        calendly_username="juan-test",
        tipo_servicio="metodologia",
    )
    assert str(prof) == "Juan Test"
