from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Elimina todos los usuarios administradores del sistema"

    def add_arguments(self, parser):
        parser.add_argument(
            "--confirm",
            action="store_true",
            help="Omite el prompt interactivo y confirma la eliminación directamente",
        )

    def handle(self, *args, **options):
        User = get_user_model()
        self.stdout.write("--- Iniciando eliminación de usuarios ---")

        usuarios = User.objects.all()
        total = usuarios.count()

        if total == 0:
            self.stdout.write("No hay usuarios en la base de datos.")
            return

        self.stdout.write(f"Se encontraron {total} usuario(s) en la base de datos:")
        for user in usuarios:
            self.stdout.write(f"  - {user.username} ({user.email})")

        if options["confirm"]:
            confirmacion = "SI"
        else:
            confirmacion = input(
                "\n¿Estás seguro de eliminar TODOS los usuarios? (escribe 'SI' para confirmar): "
            )

        if confirmacion.strip().upper() == "SI":
            usuarios.delete()
            self.stdout.write(
                self.style.SUCCESS(f"\n✓ Se eliminaron {total} usuario(s) correctamente.")
            )
        else:
            self.stdout.write("Operación cancelada. No se eliminó ningún usuario.")
