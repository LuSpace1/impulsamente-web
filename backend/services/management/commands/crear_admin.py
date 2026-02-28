from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Crea o actualiza los usuarios administradores del sistema"

    USUARIOS = [
        {
            "username": "impulsamente@team.cl",
            "email": "admin@impulsamente.cl",
            "password": "admin123",
        },
        {
            "username": "admin",
            "email": "admin@impulsamente.cl",
            "password": "admin123",
        },
        {
            "username": "impulsamente@team",
            "email": "admin@impulsamente.cl",
            "password": "admin123",
        },
    ]

    def handle(self, *args, **options):
        User = get_user_model()
        self.stdout.write("--- Iniciando gestión de usuarios ---")

        for data in self.USUARIOS:
            username = data["username"]
            password = data["password"]
            email = data["email"]

            if User.objects.filter(username=username).exists():
                self.stdout.write(
                    f"El usuario '{username}' ya existe. Actualizando credenciales..."
                )
                user = User.objects.get(username=username)
                user.set_password(password)
                user.email = email
                user.is_superuser = True
                user.is_staff = True
                user.save()

                # Forzar update directo en la DB para garantizar el campo
                if hasattr(user, "password_must_change"):
                    User.objects.filter(pk=user.pk).update(password_must_change=True)
                    self.stdout.write(
                        f" -> Bandera 'password_must_change' activada para {username}"
                    )

                self.stdout.write(
                    self.style.SUCCESS(f" -> Usuario '{username}' actualizado correctamente.")
                )

            else:
                self.stdout.write(f"Creando nuevo superusuario: {username}")
                user = User.objects.create_superuser(
                    username=username, email=email, password=password
                )

                # Forzar update directo en la DB, evitando lógica del modelo que resetee el campo
                if hasattr(user, "password_must_change"):
                    User.objects.filter(pk=user.pk).update(password_must_change=True)
                    self.stdout.write(
                        f" -> Bandera 'password_must_change' activada para {username}"
                    )

                self.stdout.write(self.style.SUCCESS(f" -> ¡Usuario '{username}' creado!"))

        self.stdout.write(
            self.style.SUCCESS(
                "--- ¡Listo! Los usuarios están operativos y pedirán cambio de clave. ---"
            )
        )
