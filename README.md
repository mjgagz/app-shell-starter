# Forma · app-shell-starter

Plantilla para construir sitios públicos y aplicaciones de gestión con React 18, Vite, TypeScript estricto y Tailwind CSS. El catálogo interactivo permite probar los componentes antes de incorporarlos a una pantalla.

## Empezar

Con Node 22.12 o posterior, instala las dependencias y arranca Vite desde la raíz del repositorio.

```sh
npm ci
npm run dev
```

Abre `/catalogo` en la dirección local de Vite. Usa **Buscar** o el atajo Ctrl/Cmd + K para localizar páginas y ejemplos. En **Fundamentos** puedes comparar los colores en los dos temas, revisar tipografía y consultar la escala de espaciado. **Mapa de la app** reúne 14 áreas con criterios de diseño, implementación y operación.

| Ruta | Uso |
|---|---|
| `/catalogo` | Biblioteca pública Forma |
| `/catalogo/componentes` | Ejemplos de tablas, gráficas, formularios, controles y estados |
| `/catalogo/mapa` | Mapa completo de una aplicación web |
| `/login` | Entrada de prueba con nombre, correo y rol |
| `/` | Panel de ejemplo para lectores y editores |
| `/settings` | Configuración para editores |

## Crear un proyecto

1. Crea una copia del repositorio. Copia `.env.example` a `.env.local` para personalizar el nombre de la aplicación y la URL pública de la API. Los valores predeterminados permiten arrancar inmediatamente.
2. Define las entidades en `src/domain/` y crea el acceso a datos en `src/data/`. Usa el mismo contrato CRUD para almacenamiento local o REST. [Contrato y ejemplo de integración](docs/datos.md).
3. Compón las vistas en `src/views/` con los elementos de `src/components/ui/` y `src/components/layout/`. Registra en `src/App.tsx` cada ruta pública o con sesión. El catálogo se carga de forma diferida.
4. Personaliza los colores semánticos y las fuentes en `src/index.css`. Mantén jerarquía, foco visible y controles de al menos 40 px. Verifica a anchos de celular y laptop, con teclado y en ambos temas.
5. Ejecuta `npm run lint` y `npm run build`. Para revisar el resultado, usa `npm run preview`. En hosting estático, configura la reescritura de las rutas de la aplicación hacia `index.html` para admitir enlaces directos.

## Alcance de la plantilla

Las pruebas de navegador cubren los permisos por rol, la cancelación de un formulario inválido y los filtros de tabla en móvil. Instala Chromium una vez con `npx playwright install chromium` y ejecuta `npm run test:e2e`. También puedes definir `PLAYWRIGHT_CHANNEL=chrome` para usar Chrome instalado.

La sesión de ejemplo se guarda en el navegador y permite ensayar la navegación por rol. Al conectar datos reales, implementa autenticación y autorización en el servidor. Las variables `VITE_*` forman parte del cliente público. Define también las políticas de respaldo, recuperación, monitoreo y publicación que correspondan al producto. El mapa del catálogo identifica estas decisiones para cada proyecto.
