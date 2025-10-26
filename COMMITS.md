# Convenciones de Commits - ImpulsaMente

## ¿Por qué usamos Conventional Commits?

- Historial limpio y fácil de entender
- Colaboración efectiva entre el equipo
- Búsqueda rápida de cambios específicos
- Estándar profesional de la industria

---

## Formato Base

```
<tipo>(scope): <descripción>

[cuerpo opcional]

[footer opcional]
```

### Componentes:

- **tipo**: Categoría del cambio (obligatorio)
- **scope**: Área afectada del código (opcional pero recomendado)
- **descripción**: Qué se hizo (obligatorio, máximo 50 caracteres)

### Ejemplo:
```bash
feat(models): crear modelo Professional con campos base
```

---

## Tipos de Commit

| Tipo | Cuándo usar | Ejemplo |
|------|-------------|---------|
| `feat` | Nueva funcionalidad | `feat(hero): agregar sección principal` |
| `fix` | Corrección de errores | `fix(navbar): corregir menú en móviles` |
| `style` | Cambios visuales/CSS | `style(services): mejorar diseño de cards` |
| `docs` | Documentación | `docs: actualizar guía de instalación` |
| `refactor` | Mejorar código sin cambiar funcionalidad | `refactor(api): reorganizar endpoints` |
| `test` | Agregar o modificar tests | `test(forms): agregar validación de campos` |
| `chore` | Tareas de mantenimiento | `chore: actualizar dependencias de React` |

---

## Scopes del Proyecto

### Frontend (React)

#### Secciones de la Landing
```
hero        # Sección principal con CTA
navbar      # Barra de navegación
services    # Cards de servicios
about       # Acerca de nosotros
contact     # Formulario de contacto
footer      # Pie de página
```

#### Componentes y Funcionalidad
```
components  # Componentes reutilizables
pages       # Páginas completas
hooks       # Custom hooks de React
styles      # CSS global y temas
responsive  # Adaptaciones móvil/tablet
```

### Backend (Django)

```
api         # Endpoints REST
models      # Modelos de base de datos
views       # Vistas de Django
forms       # Formularios
serializers # Serialización de datos
admin       # Configuración Django Admin
settings    # Configuración del proyecto
urls        # Configuración de rutas
migrations  # Migraciones de BD
```

### General

```
config      # Configuraciones generales
deps        # Gestión de dependencias
fixtures    # Datos de prueba
```

---

## Ejemplos Prácticos - Story 1.1: Modelo de Profesionales

### TASK IMP-3: Crear modelo
```bash
feat(models): crear modelo Professional con campos base

- Campos: nombre, titulo, especialidad, biografia
- Campo foto con ImageField
- Campo calendly_username unique
- Choices para tipo_servicio
- Método __str__ implementado
```

### TASK IMP-4: Migraciones
```bash
feat(models): crear migración inicial para Professional
```

### TASK IMP-5: Django Admin
```bash
feat(admin): configurar admin para modelo Professional

- list_display con campos principales
- Filtros por tipo_servicio y activo
- Búsqueda por nombre y especialidad
- Ordenamiento por campo orden
```

### TASK IMP-6: Datos de prueba
```bash
chore(fixtures): agregar datos de prueba para Professional

- 2 psicólogas de ejemplo
- 1 asesora metodológica
- Facilita setup del equipo
```

---

## Reglas del Equipo

### HACER:

1. **Tiempo presente**: "agregar" no "agregado"
2. **Máximo 50 caracteres** en la descripción
3. **Minúsculas** en la descripción (excepto nombres propios)
4. **Un commit = un cambio lógico** específico
5. **Usar scope** cuando sea relevante para claridad
6. **Ser descriptivo** pero conciso

### NO HACER:

#### Mensajes Vagos
```bash
# Incorrecto
git commit -m "fix: arreglos"
git commit -m "feat: cambios"
git commit -m "chore: updates"
```

#### Mensajes Muy Largos
```bash
# Incorrecto
git commit -m "feat(services): implementar toda la sección de servicios con diseño responsivo y animaciones CSS y conexión completa con API del backend"
```

#### Mezclar Tipos de Cambios
```bash
# Incorrecto
git commit -m "feat: hero section + fix navbar + docs readme"
```

#### Tiempo Incorrecto
```bash
# Incorrecto
git commit -m "feat(hero): agregué sección principal"
git commit -m "fix(api): corregido el endpoint"
```

### Versiones Correctas

```bash
# Específico y claro
git commit -m "fix(navbar): corregir menú desplegable en móvil"
git commit -m "feat(contact): agregar validación de email"
git commit -m "style(hero): centrar contenido en pantallas grandes"

# Longitud adecuada
git commit -m "feat(api): crear endpoint para profesionales"
git commit -m "refactor(components): optimizar estructura de carpetas"

# Cambios separados
git commit -m "feat(hero): implementar sección principal"
# (siguiente commit)
git commit -m "fix(navbar): corregir menú en móvil"
# (siguiente commit)
git commit -m "docs: actualizar README con ejemplos"
```

---

## Commits por Tipo de Rama

### En ramas feature/:
- Usar todos los tipos según corresponda
- Commits frecuentes y específicos
- Cada tarea = mínimo 1 commit

```bash
# En feature/modelo-profesionales
git commit -m "feat(models): crear modelo Professional"
git commit -m "feat(models): crear migración inicial"
git commit -m "feat(admin): configurar admin"
git commit -m "chore(fixtures): agregar datos de prueba"
```

### Merge a develop:
- Mensaje del merge automático está bien
- O personalizar si se prefiere

```bash
# Merge desde GitHub (automático)
Merge pull request #12 from usuario/feature/modelo-profesionales

# O desde terminal (personalizado)
git commit -m "feat(models): integrar modelo Professional completo (#12)"
```

### Merge a main (fin de sprint):
- Mensaje descriptivo del sprint completo
- Solo lo hace el líder técnico

```bash
git commit -m "release: Sprint 1 - Backend base y primeros modelos

- Modelo Professional implementado
- API REST para profesionales
- Estructura base de React
- Conexión frontend-backend verificada"
```

---

## Comandos Git Útiles

### Antes de hacer commit:
```bash
# Ver estado actual
git status

# Ver cambios específicos
git diff

# Ver cambios en archivo específico
git diff ruta/archivo.py
```

### Hacer commit:
```bash
# Agregar archivos específicos
git add ruta/archivo.py

# Agregar todos los cambios
git add .

# Commit con mensaje
git commit -m "feat(models): crear modelo Professional"

# Ver último commit
git log -1
```

### Revisar historial:
```bash
# Ver commits de forma compacta
git log --oneline

# Ver últimos 5 commits
git log --oneline -5

# Ver commits con gráfico
git log --oneline --graph
```

### Corregir último commit:
```bash
# Solo si NO se ha pusheado
git commit --amend -m "feat(models): mensaje corregido"

# Si ya se pusheó: hacer nuevo commit de corrección
git commit -m "fix(models): corregir validación de campo"
```

---

## Checklist de Auto-Revisión

Antes de hacer commit, verificar:

- ¿El tipo de commit es correcto?
- ¿El scope identifica claramente el área?
- ¿La descripción es clara y concisa (menor a 50 caracteres)?
- ¿Usé tiempo presente?
- ¿Está en minúsculas?
- ¿Alguien entenderá qué cambié sin ver el código?
- ¿Es un cambio lógico completo?

---

## Objetivo

Al final del proyecto, nuestro historial de commits debe ser:

- **Profesional**: Listo para mostrar en portafolio
- **Claro**: Cualquiera entiende qué se hizo
- **Útil**: Facilita búsqueda de cambios y debugging
- **Organizado**: Refleja el progreso del proyecto

---

**Ante dudas, consulta este documento o pregunta al equipo antes de commitear.**