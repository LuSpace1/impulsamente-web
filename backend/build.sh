#!/usr/bin/env bash
# exit on error
set -o errexit

# Instalar dependencias
pip install -r requirements.txt

# Recolectar archivos estáticos (CSS del admin)
python manage.py collectstatic --no-input

# Correr migraciones (Actualizar la Base de Datos de Render)
python manage.py migrate