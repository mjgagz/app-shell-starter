# Adaptadores de datos

Las vistas consumen un servicio o hook que trabaja contra `CrudRepository<T>`. Cada entidad tiene un `id` de tipo `string`. El proyecto que usa la plantilla decide qué implementación inyectar al construir el servicio.

- `LocalStorageRepository` recibe una clave de almacenamiento y un validador de entidad. El tercer parámetro permite sustituir el almacenamiento durante una prueba.
- `RestRepository` recibe la URL de la colección, el mismo validador y, opcionalmente, una función compatible con `fetch`. El adaptador realiza su primera petición cuando el consumidor invoca un método.

## Conectar una colección

Configura `VITE_API_BASE_URL` en el entorno de la aplicación. La variable llega al código público del navegador. Construye el repositorio en `src/data/` o en el punto de composición del proyecto. Este ejemplo usa una entidad mínima.

```ts
import type { BaseEntity } from '../domain/types'
import { appConfig } from './config'
import { RestRepository } from './restRepository'

function isItem(value: unknown): value is BaseEntity {
  return typeof value === 'object' && value !== null &&
    'id' in value && typeof value.id === 'string'
}

const base = appConfig.apiBaseUrl.replace(/\/+$/, '')
export const items = new RestRepository(`${base}/items`, isItem)
```

Añade al validador los campos obligatorios de la entidad. Para usar sesiones de servidor, inyecta una función de transporte que preserve las cabeceras y opciones de la petición e incluya el mecanismo de autenticación del proyecto. El servidor comprueba permisos y valida cada escritura.

## Contrato HTTP

| Método del repositorio | Petición | Respuesta de éxito | Recurso ausente |
|---|---|---|---|
| `getAll()` | `GET /items` | Arreglo JSON de entidades, incluida la lista vacía | Error HTTP |
| `getById(id)` | `GET /items/{id}` | Entidad JSON | `null` ante 404 |
| `create(entity)` | `POST /items` con entidad e ID | Entidad JSON con el ID enviado | Error HTTP |
| `update(id, changes)` | `PATCH /items/{id}` con los campos modificados | Entidad JSON actualizada con el ID solicitado | `null` ante 404 |
| `delete(id)` | `DELETE /items/{id}` | `true` ante 2xx, admite 204 | `false` ante 404 |

El cliente asigna los identificadores antes de crear entidades. Deben ser cadenas no vacías distintas de `.` y `..`. Los identificadores se codifican como un segmento de ruta. Las lecturas, altas y modificaciones requieren JSON.

Los fallos HTTP rechazan la promesa con `RepositoryHttpError` y su propiedad numérica `status`. Los errores de transporte y de análisis JSON se propagan. Una respuesta con estructura incompatible o un ID distinto produce `TypeError`. Para cargas paginadas desde el servidor, define un contrato adicional que incluya los parámetros de consulta y los metadatos de la página.
