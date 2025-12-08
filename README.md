# ImpulsaMente

> Landing page profesional para servicios de acompañamiento psicológico y asesoría metodológica

[![Estado](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow)](https://github.com)
[![Versión](https://img.shields.io/badge/Versión-0.2.0-blue)](https://github.com)

---

## Descripción

ImpulsaMente es una plataforma web que conecta profesionales de la psicología clínica y metodología académica con personas que buscan apoyo profesional especializado. La plataforma ofrece servicios de acompañamiento psicológico, asesoramiento metodológico para trabajos de tesis, y planes integrales que combinan ambos servicios.

Este repositorio contiene el desarrollo completo de la landing page oficial con sistema de agendamiento integrado.

---

## Stack Tecnológico

### Backend
- **Django 5.2.7+** - Framework web de Python
- **Django REST Framework** - API REST
- **PostgreSQL** - Base de datos en producción
- **SQLite** - Base de datos en desarrollo
- **Python 3.14+**

### Frontend
- **React 19.2+** - Biblioteca de JavaScript
- **React Router DOM** - Navegación
- **Bootstrap 5.3** - Framework CSS
- **Axios** - Cliente HTTP
- **react-calendly** - Integración de widgets de agendamiento

### Integraciones
- **Calendly** - Sistema de agendamiento de citas

---

## Estructura del Proyecto

```
impulsamente-web/
├── backend/                 # Aplicación Django
│   ├── impulsamente/       # Configuración principal
│   ├── services/           # Aplicación de servicios
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/               # Aplicación React
│   ├── public/
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/         # Páginas principales
│   │   └── services/      # Servicios de API
│   ├── package.json
│   └── package-lock.json
│
├── docs/                   # Documentación adicional
├── .gitignore
├── COMMITS.md             # Convenciones de commits
├── GITFLOW.md             # Flujo de trabajo con ramas
└── README.md
```

---

## Instalación

### Requisitos Previos

- Python 3.14+
- Node.js 16+
- PostgreSQL (para producción)
- Git

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Accesos Locales

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000
- **Django Admin:** http://localhost:8000/admin

---

## Flujo de Desarrollo

Este proyecto utiliza GitFlow simplificado con tres tipos de ramas:

- **main** - Código en producción
- **develop** - Integración continua
- **feature/*** - Desarrollo de funcionalidades

Para más detalles, consultar [GITFLOW.md](./GITFLOW.md) y [COMMITS.md](./COMMITS.md).

---

## Equipo de Desarrollo

| Desarrollador | GitHub |
|---------------|--------|
| **Luciano Salinas Tapia** | [@LuSpace1](https://github.com/LuSpace1) |
| **Bastian Apablaza Vega** | [@Park-Ocean](https://github.com/Park-Ocean) |
| **Ignacio Arancibia Olivares** | [@ignacio0822](https://github.com/ignacio0822) |

---

## Licencia

Proyecto privado - Todos los derechos reservados © 2025

---

**Desarrollado como proyecto integrado por estudiantes de Analista Programador Inacap**
