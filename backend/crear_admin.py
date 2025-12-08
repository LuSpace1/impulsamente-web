from django.contrib.auth import get_user_model
import os
import django

# Configura Django para que pueda acceder a la DB
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "impulsamente.settings")
django.setup()

User = get_user_model()

# --- LISTA DE USUARIOS ---
USUARIOS = [
    {
        "username": "impulsamente@team.cl",
        "email": "admin@impulsamente.cl",
        "password": "admin123"
    },
    {
        "username": "admin",
        "email": "admin@impulsamente.cl",
        "password": "admin123"
    },
    {
        "username": "impulsamente@team",
        "email": "admin@impulsamente.cl",
        "password": "admin123"
    }
]


def gestionar_usuarios():
    print("--- Iniciando gestión de usuarios ---")

    for data in USUARIOS:
        username = data['username']
        password = data['password']
        email = data['email']

        # Verificamos si existe
        if User.objects.filter(username=username).exists():
            print(
                f"El usuario '{username}' ya existe. Actualizando credenciales...")
            user = User.objects.get(username=username)

            # 1. Actualizamos la contraseña
            user.set_password(password)

            # 2. Actualizamos email y permisos
            user.email = email
            user.is_superuser = True
            user.is_staff = True

            # 3. OBLIGAR CAMBIO DE CONTRASEÑA (Aquí está el cambio)
            # Usamos getattr/setattr por seguridad si el campo no existiera,
            # pero dado tus logs, el campo es 'password_must_change'.
            if hasattr(user, 'password_must_change'):
                user.password_must_change = True
                print(
                    f" -> Bandera 'password_must_change' activada para {username}")

            user.save()
            print(f" -> Usuario '{username}' actualizado correctamente.")

        else:
            print(f"Creando nuevo superusuario: {username}")
            # Creamos el usuario
            user = User.objects.create_superuser(
                username=username, email=email, password=password)

            # Opcional: También obligar a cambiarla al nuevo usuario
            if hasattr(user, 'password_must_change'):
                user.password_must_change = True
                user.save()

            print(f" -> ¡Usuario '{username}' creado!")

    print("--- ¡Listo! Los usuarios están operativos y pedirán cambio de clave. ---")


if __name__ == '__main__':
    gestionar_usuarios()
