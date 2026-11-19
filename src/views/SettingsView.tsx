import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { appConfig } from '../data/config'
import { useAuth } from '../hooks/useAuth'

export function SettingsView() {
  const { user } = useAuth()

  return (
    <>
      <h1 className="mb-7 text-3xl font-semibold tracking-tight sm:text-4xl">Configuración general</h1>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold tracking-tight">Aplicación</h2>
          <dl className="mt-4 divide-y divide-line text-sm">
            <div className="grid gap-1 py-3 sm:grid-cols-[7rem_1fr] sm:gap-4">
              <dt className="text-muted">Nombre</dt>
              <dd className="wrap-anywhere">{appConfig.name}</dd>
            </div>
            <div className="grid gap-1 py-3 sm:grid-cols-[7rem_1fr] sm:gap-4">
              <dt className="text-muted">URL base de API</dt>
              <dd className="wrap-anywhere">{appConfig.apiBaseUrl}</dd>
            </div>
          </dl>
        </Card>
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold tracking-tight">Sesión</h2>
            <Badge tone="success">Modo de prueba</Badge>
          </div>
          <dl className="mt-4 divide-y divide-line text-sm">
            <div className="grid gap-1 py-3 sm:grid-cols-[7rem_1fr] sm:gap-4">
              <dt className="text-muted">Nombre</dt>
              <dd className="wrap-anywhere">{user?.name}</dd>
            </div>
            <div className="grid gap-1 py-3 sm:grid-cols-[7rem_1fr] sm:gap-4">
              <dt className="text-muted">Correo</dt>
              <dd className="wrap-anywhere">{user?.email}</dd>
            </div>
            <div className="grid gap-1 py-3 sm:grid-cols-[7rem_1fr] sm:gap-4">
              <dt className="text-muted">Permisos</dt>
              <dd>{user?.role === 'lector' ? 'Lector' : 'Editor'}</dd>
            </div>
          </dl>
        </Card>
      </div>
    </>
  )
}
