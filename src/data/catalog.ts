export const specimens = [
  {
    id: 'controles',
    title: 'Controles',
    group: 'Interacción',
    description: 'Botones, variantes y respuestas al interactuar.',
  },
  {
    id: 'tabla',
    title: 'Tabla de datos',
    group: 'Datos',
    description: 'Búsqueda, filtros, paginación y exportación.',
  },
  {
    id: 'grafica',
    title: 'Gráficas',
    group: 'Datos',
    description: 'Visualización de series y lectura de valores.',
  },
  {
    id: 'formulario',
    title: 'Formularios',
    group: 'Interacción',
    description: 'Captura y validación en un panel lateral.',
  },
  {
    id: 'estados',
    title: 'Estados de interfaz',
    group: 'Interacción',
    description: 'Carga, resultados vacíos y recuperación de errores.',
  },
] as const

export type Specimen = (typeof specimens)[number]
export type Section =
  'resumen' | 'fundamentos' | 'componentes' | 'mapa' | Specimen['id']

export const applicationMap = [
  [
    'Producto',
    'Define a quién sirve la aplicación, qué tarea debe resolver y cómo medirás si funciona.',
    'Al clonar, documenta el público y un criterio de éxito verificable.',
  ],
  [
    'Contenido y navegación',
    'Usa títulos descriptivos, rutas enlazables y etiquetas consistentes.',
    'El catálogo tiene enlaces directos a cada ejemplo y navegación con historial.',
  ],
  [
    'Identidad visual',
    'Aplica colores por función, una escala tipográfica y reglas de espaciado.',
    'Fundamentos reúne las muestras que usan el catálogo y la aplicación.',
  ],
  [
    'Diseño adaptable',
    'Conserva la prioridad de lectura al cambiar el espacio disponible.',
    'El menú, las rejillas y el área de lectura se adaptan al ancho.',
  ],
  [
    'Componentes e interacción',
    'Define el comportamiento con puntero, teclado y movimiento reducido.',
    'Controles y formularios permiten probar las variantes y el foco.',
  ],
  [
    'Formularios y acciones',
    'Etiqueta los campos y explica cómo corregir una entrada inválida.',
    'El formulario lateral valida los datos antes de confirmar.',
  ],
  [
    'Tablas, filtros y gráficas',
    'Mantén visibles las unidades, el alcance de los filtros y los datos que se exportan.',
    'La tabla y la gráfica se pueden explorar en el catálogo.',
  ],
  [
    'Accesibilidad',
    'Comprueba orden de foco, nombres accesibles, contraste y ampliación.',
    'Verifica las pantallas nuevas también con lector de pantalla y teclado.',
  ],
  [
    'Estados y recuperación',
    'Distingue carga, ausencia de resultados, error y éxito.',
    'Estados de interfaz permite ensayar las respuestas y la recuperación.',
  ],
  [
    'Arquitectura',
    'Separa vistas, primitivas, dominio y acceso a datos.',
    'Las convenciones de AGENTS.md y TypeScript estricto gobiernan el proyecto.',
  ],
  [
    'Datos e integraciones',
    'Valida los datos en el límite del repositorio y define cómo se recuperan ante fallos.',
    'Hay adaptadores local y REST. Cada producto define esquema, migraciones y respaldo.',
  ],
  [
    'Identidad y permisos',
    'Define roles y comprueba el permiso en cada operación del servidor.',
    'La sesión y los roles son simulados. Para producción, conecta identidad y autorización reales.',
  ],
  [
    'Rendimiento y presencia web',
    'Mide carga e interacción en dispositivos representativos y con datos reales.',
    'La biblioteca se carga por ruta. Al publicar, configura metadatos e indexación según la audiencia.',
  ],
  [
    'Calidad y operación',
    'Prueba cambios, prepara la reversión y asigna responsables de los fallos.',
    'Build y lint verifican la base. Cada despliegue necesita alojamiento, observabilidad y restauración probada.',
  ],
] as const
