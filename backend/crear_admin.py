from django.contrib.auth import get_user_model
import os
import django

# Configura Django para que pueda acceder a la DB
# OJO: Asegúrate de que 'impulsamente' sea el nombre real de tu carpeta de settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "impulsamente.settings")
django.setup()


User = get_user_model()
USERNAME = 'admin'  # Tu usuario
PASSWORD = 'tu_password_segura_123'  # Pon la contraseña que quieras usar
EMAIL = 'admin@ejemplo.com'


def crear():
    if not User.objects.filter(username=USERNAME).exists():
        print(f"Creando superusuario: {USERNAME}")
        User.objects.create_superuser(USERNAME, EMAIL, PASSWORD)
        print("¡Listo! Usuario creado.")
    else:
        print("El usuario ya existe. No se hizo nada.")


if __name__ == '__main__':
    crear()
