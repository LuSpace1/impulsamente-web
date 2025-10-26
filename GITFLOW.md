# GitFlow - ImpulsaMente

## Introducción

Este documento define la estrategia de ramas y flujo de trabajo para el proyecto ImpulsaMente. Utilizamos una versión simplificada de GitFlow adaptada a las necesidades de un equipo de 3 desarrolladores trabajando en un proyecto de 1 mes.

### ¿Por qué GitFlow?

- **Organización**: Cada rama tiene un propósito específico
- **Estabilidad**: La rama main siempre contiene código funcional
- **Colaboración**: Permite trabajo paralelo sin conflictos
- **Calidad**: Process de revisión antes de integrar cambios

---

## Estructura de Ramas

El proyecto utiliza 3 tipos de ramas:

### 1. main (Producción)
- Contiene código estable y testeado
- Solo recibe merges desde develop al finalizar cada sprint
- Representa el estado "listo para desplegar"
- **Protegida**: Solo el líder técnico puede hacer merge

### 2. develop (Integración)
- Rama de desarrollo activo
- Base para crear nuevas features
- Recibe merges de ramas feature/ vía Pull Request
- Código funcional pero puede estar en progreso
- **Protegida**: Requiere Pull Request aprobado

### 3. feature/ (Temporal)
- Una rama por historia de usuario o funcionalidad
- Se crea desde develop
- Se elimina después del merge exitoso
- Permite trabajo aislado sin afectar a otros

---

## Reglas por Rama

### Rama main

**Propósito**: Código de producción

**Reglas**:
- NO se puede commitear directamente
- Solo recibe merge desde develop
- Merge realizado al finalizar cada sprint
- Solo el líder técnico ejecuta el merge
- Cada merge representa una versión del proyecto

**Excepción**:
- Setup inicial del proyecto (README.md, GITFLOW.md, COMMITS.md)
- Realizado por líder técnico al inicio

**Protección en GitHub**:
- Requiere Pull Request para merge
- Solo líder técnico puede aprobar y hacer merge

---

### Rama develop

**Propósito**: Integración continua del desarrollo

**Reglas**:
- NO se puede commitear directamente
- TODO cambio debe venir de una rama feature/
- Recibe merges vía Pull Request
- Base para crear nuevas features
- Código debe estar funcional (sin errores)

**Pull Requests**:
- Cualquier miembro puede aprobar (excepto el autor)
- Requiere al menos 1 aprobación
- Revisión de código obligatoria

**Protección en GitHub**:
- Requiere Pull Request para merge
- Requiere al menos 1 aprobación
- No permite commits directos

---

### Ramas feature/

**Propósito**: Desarrollo de historias de usuario

**Nomenclatura**:
```
feature/<descripcion-libre>
```

**Ejemplos**:
```
feature/modelo-profesionales
feature/hero-section
feature/formulario-contacto
feature/api-profesionales
```

**Reglas**:
- Siempre en español
- Descripción clara y concisa
- Sin ID de Jira (descripción libre)
- Guiones para separar palabras

**Ciclo de vida**:
1. Se crea desde develop
2. Desarrollo con commits frecuentes
3. Push a GitHub
4. Pull Request a develop
5. Revisión y aprobación
6. Merge a develop
7. Rama eliminada

---

## Flujo Completo de Trabajo

### Diagrama Visual

```
main (producción)
  │
  │ (merge fin de sprint)
  │
develop (integración)
  │
  ├─── feature/modelo-profesionales
  │      ├─ commit: feat(models): crear modelo
  │      ├─ commit: feat(models): crear migración
  │      └─ commit: feat(admin): configurar admin
  │      └─ (PR) → merge a develop → BORRADA
  │
  ├─── feature/hero-section
  │      ├─ commit: feat(hero): crear componente
  │      └─ commit: style(hero): agregar animaciones
  │      └─ (PR) → merge a develop → BORRADA
  │
  └─── feature/api-profesionales
         ├─ commit: feat(api): crear endpoints
         └─ (PR) → merge a develop → BORRADA
```

---

## Comandos Git por Escenario

### Escenario 1: Iniciar nueva historia de usuario

```bash
# 1. Asegurarse de estar en develop y actualizado
git checkout develop
git pull origin develop

# 2. Crear rama feature desde develop
git checkout -b feature/modelo-profesionales

# 3. Verificar que estás en la nueva rama
git branch
# * feature/modelo-profesionales
#   develop
#   main

# 4. Comenzar a trabajar
```

---

### Escenario 2: Trabajar en la feature

```bash
# 1. Hacer cambios en el código
# (editar archivos según la tarea)

# 2. Ver qué cambió
git status
git diff

# 3. Agregar archivos al staging
git add backend/services/models.py

# 4. Hacer commit siguiendo convenciones
git commit -m "feat(models): crear modelo Professional"

# 5. Continuar con siguiente tarea
# (repetir pasos 1-4 para cada tarea)

# 6. Subir cambios a GitHub
git push origin feature/modelo-profesionales

# Si es el primer push de la rama:
git push -u origin feature/modelo-profesionales
```

---

### Escenario 3: Crear Pull Request

```bash
# 1. Asegurarse de que todo está pusheado
git status
# Should be: "nothing to commit, working tree clean"

# 2. Ir a GitHub en el navegador
# https://github.com/usuario/impulsamente

# 3. Verás banner: "feature/modelo-profesionales had recent pushes"
# Click en "Compare & pull request"

# 4. Configurar Pull Request:
#    Base: develop ← Compare: feature/modelo-profesionales
#    Título: feat(models): implementar modelo Professional
#    Descripción:
#    """
#    Implementa Story 1.1: Modelo de Profesionales
#    
#    Tareas completadas:
#    - Crear modelo Professional
#    - Crear migraciones
#    - Configurar Django Admin
#    - Agregar datos de prueba
#    
#    Checklist:
#    - [x] Código funcional
#    - [x] Sin errores en consola
#    - [x] Commits siguen convención
#    """

# 5. Asignar reviewer (compañero de equipo)

# 6. Click "Create pull request"
```

---

### Escenario 4: Revisar Pull Request (como revisor)

```bash
# 1. Ir a GitHub → Pull Requests
# 2. Abrir el PR asignado
# 3. Revisar pestaña "Files changed"
# 4. Verificar:
#    - Código limpio y legible
#    - Commits claros
#    - Sin errores obvios
#    - Cumple con la historia de usuario

# 5. Si todo está bien:
#    - Click "Review changes"
#    - Seleccionar "Approve"
#    - Agregar comentario (opcional)
#    - Click "Submit review"

# 6. Si hay problemas:
#    - Seleccionar "Request changes"
#    - Describir qué debe corregirse
#    - Autor corrige y pushea nuevos commits
```

---

### Escenario 5: Hacer merge del Pull Request

```bash
# 1. PR aprobado por al menos 1 revisor
# 2. Click en "Merge pull request"
# 3. Confirmar merge
# 4. Click "Delete branch" (eliminar feature/ de GitHub)

# 5. Actualizar repositorio local
git checkout develop
git pull origin develop

# 6. Eliminar rama feature local
git branch -d feature/modelo-profesionales

# 7. Verificar ramas locales
git branch
# * develop
#   main
```

---

### Escenario 6: Merge de develop a main (fin de sprint)

**Solo ejecutado por líder técnico**

```bash
# 1. Reunión de fin de sprint - verificar que develop está estable

# 2. Actualizar develop local
git checkout develop
git pull origin develop

# 3. Cambiar a main y actualizar
git checkout main
git pull origin main

# 4. Hacer merge desde develop
git merge develop

# 5. Agregar tag con versión del sprint
git tag -a v0.1.0 -m "Sprint 1: Backend base y primeros modelos"

# 6. Subir a GitHub
git push origin main
git push origin v0.1.0

# 7. Volver a develop para continuar desarrollo
git checkout develop
```

---

## Casos Especiales

### Actualizar feature con cambios de develop

Si develop recibió cambios mientras trabajabas en tu feature:

```bash
# 1. Commitear o guardar cambios actuales
git add .
git commit -m "feat(models): trabajo en progreso"

# 2. Cambiar a develop y actualizar
git checkout develop
git pull origin develop

# 3. Volver a tu feature
git checkout feature/modelo-profesionales

# 4. Traer cambios de develop a tu feature
git merge develop

# 5. Resolver conflictos si hay (Git te indicará)
# 6. Continuar trabajando
```

---

### Resolver conflictos de merge

```bash
# Si al hacer merge aparece conflicto:

# 1. Git marca archivos en conflicto
git status
# both modified: archivo.py

# 2. Abrir archivo y buscar marcadores:
<<<<<<< HEAD
tu código
=======
código en conflicto
>>>>>>> develop

# 3. Decidir qué mantener, editar manualmente
# 4. Eliminar marcadores de conflicto
# 5. Guardar archivo

# 6. Agregar archivo resuelto
git add archivo.py

# 7. Completar el merge
git commit -m "merge: resolver conflictos con develop"
```

---

### Cambiar de feature a mitad de trabajo

```bash
# Opción 1: Commitear trabajo actual
git add .
git commit -m "feat(models): trabajo en progreso"
git push origin feature/modelo-profesionales

# Cambiar a otra feature
git checkout develop
git checkout -b feature/hero-section

# Luego volver
git checkout feature/modelo-profesionales

# Opción 2: Guardar temporalmente sin commit
git stash
git checkout feature/hero-section
# (trabajar en otra cosa)
git checkout feature/modelo-profesionales
git stash pop
```

---

## Protección de Ramas

### ¿Qué significa proteger una rama?

La protección de ramas en GitHub establece reglas automáticas que impiden acciones no autorizadas.

### Rama main (Protección estricta)

**Reglas configuradas**:
- Requiere Pull Request para cualquier cambio
- Requiere aprobación específica del líder técnico
- No permite push directo (ni siquiera de administradores)
- No permite eliminar la rama
- No permite force push

**Resultado**:
- Solo el líder técnico puede hacer merge de develop a main
- Cambios solo al fin de sprint
- Historial limpio y controlado

### Rama develop (Protección moderada)

**Reglas configuradas**:
- Requiere Pull Request para cambios
- Requiere al menos 1 aprobación
- El autor del PR no puede aprobar su propio PR
- No permite push directo
- Permite merge después de aprobación

**Resultado**:
- TODO cambio pasa por revisión de código
- Trabajo en equipo y calidad asegurada
- No se puede saltear el proceso

---

## Conventional Commits en el Flujo

### En ramas feature/

Usar todos los tipos según corresponda:

```bash
feat(models): crear modelo Professional
feat(api): agregar endpoint de psicólogas
fix(navbar): corregir menú en móviles
style(hero): mejorar animaciones
docs: actualizar README
test(forms): agregar validaciones
chore(deps): actualizar dependencias
refactor(components): reorganizar estructura
```

### Merge a develop

Mensaje automático de GitHub está bien:
```
Merge pull request #12 from usuario/feature/modelo-profesionales
```

O personalizar:
```bash
feat(models): integrar modelo Professional completo (#12)
```

### Merge a main (fin de sprint)

Mensaje descriptivo del sprint:
```bash
release: Sprint 1 - Backend base y primeros modelos

- Modelo Professional implementado
- API REST para profesionales funcionando
- Estructura base de React configurada
- Conexión frontend-backend verificada
- Datos de prueba disponibles
```

Para más detalles sobre convenciones de commits, consultar **COMMITS.md**.

---

## Checklist por Fase

### Al iniciar historia:
- [ ] develop actualizado localmente
- [ ] Rama feature creada desde develop
- [ ] Nombre de rama descriptivo en español
- [ ] Primera tarea iniciada

### Durante desarrollo:
- [ ] Commits frecuentes con mensajes claros
- [ ] Push regular a GitHub (respaldo)
- [ ] Código funcional sin errores
- [ ] Seguir convenciones de COMMITS.md

### Antes de Pull Request:
- [ ] Todas las tareas completadas
- [ ] Código testeado manualmente
- [ ] Sin errores en consola
- [ ] Commits siguen convención
- [ ] Todo pusheado a GitHub

### Al crear Pull Request:
- [ ] Título descriptivo
- [ ] Descripción clara de cambios
- [ ] Tareas completadas listadas
- [ ] Reviewer asignado
- [ ] Base correcta (develop)

### Después de merge:
- [ ] Rama feature eliminada en GitHub
- [ ] develop actualizado localmente
- [ ] Rama feature eliminada localmente
- [ ] Listo para siguiente historia

---

## Resumen del Flujo

1. **Planificación**: Asignar historia de usuario en Jira
2. **Inicio**: Crear feature/ desde develop actualizado
3. **Desarrollo**: Trabajar con commits frecuentes
4. **Respaldo**: Push regular a GitHub
5. **Revisión**: Crear Pull Request a develop
6. **Aprobación**: Compañero revisa y aprueba
7. **Integración**: Merge a develop y eliminar feature/
8. **Finalización**: Al fin de sprint, merge develop a main

---

## Beneficios de este Flujo

- **main siempre estable**: Nunca código roto en producción
- **develop como integración**: Todos ven el progreso continuo
- **features aisladas**: Experimentar sin afectar a otros
- **Revisión de código**: Aprender del equipo, mejorar calidad
- **Historial claro**: Fácil entender qué se hizo y cuándo
- **Trabajo paralelo**: Múltiples features simultáneas sin conflictos

---

**Este flujo es la base del trabajo colaborativo en ImpulsaMente. Cualquier duda, consultar con el equipo.**