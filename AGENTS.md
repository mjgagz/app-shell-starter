# AGENTS.md — Arquitectura Base (app-shell-starter)

## Objetivo del Repositorio
Plantilla base para aplicaciones web operativas y paneles de gestión. Debe mantenerse libre de lógica de negocio específica para poder clonarse en múltiples proyectos.

## Stack Tecnológico
- Framework: React 18+ con Vite y TypeScript en modo estricto (`strict: true`).
- Enrutamiento: React Router DOM con soporte para rutas públicas y rutas protegidas.
- Estilos: Tailwind CSS con soporte nativo para modo oscuro, superficies limpias con bordes sutiles y diseño responsivo.
- Iconografía: Lucide React (priorizar iconos claros sobre etiquetas de texto redundantes).

## Estructura de Carpetas Obligatoria
- `src/views/`: Pantallas principales y páginas de la aplicación.
- `src/components/layout/`: Estructura persistente (Sidebar colapsable, Topbar, contenedores Bento Grid).
- `src/components/ui/`: Primitivos visuales genéricos (botones, tarjetas, badges, notificaciones toast).
- `src/domain/`: Tipos, modelos de entidad e interfaces puras (sin dependencias de UI o APIs).
- `src/data/`: Contratos de repositorios y clientes de acceso a datos desacoplados.
- `src/hooks/`: Hooks personalizados para estado de sesión, tema y utilidades de interfaz.

## Reglas de Calidad para Codex
1. Prohibido usar `any` explícito en TypeScript; tipar todas las props, estados y respuestas.
2. Separar la presentación de los datos: las vistas en `src/views/` nunca hacen llamadas directas `fetch` ni contienen lógica de almacenamiento.
3. Verificar siempre que `npm run build` y el linter pasen sin errores antes de finalizar la tarea.
