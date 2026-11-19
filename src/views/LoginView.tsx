import { ArrowRight, Layers3 } from 'lucide-react'
import type { FormEvent } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { navigation } from '../components/layout/navigation'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { appConfig } from '../data/config'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'

const inputStyle = 'min-h-[40px] w-full rounded-lg border border-control-line bg-canvas px-3 text-sm placeholder:text-muted'

export function LoginView() {
  const { user, login } = useAuth()
  const { showToast } = useToast()
  const location = useLocation()
  const state: unknown = location.state
  const from = typeof state === 'object' && state !== null && 'from' in state ? state.from : null
  const destination = navigation.find(({ path }) => path === from)?.path ?? '/'

  if (user) return <Navigate to={destination} replace />

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = form.get('name')
    const email = form.get('email')
    const role = form.get('role') === 'lector' ? 'lector' : 'editor'

    if (typeof name !== 'string' || !name.trim() || typeof email !== 'string' || !email.trim()) {
      showToast('error', 'Escribe tu nombre y correo para continuar.')
      return
    }

    try {
      login({ name: name.trim(), email: email.trim(), role })
      showToast('success', 'Sesión iniciada.')
    } catch {
      showToast('error', 'No se pudo guardar la sesión en este navegador.')
    }
  }

  return (
    <main className="relative grid min-h-dvh place-items-center bg-canvas px-4 py-20">
      <div className="absolute inset-x-4 top-3 flex items-center justify-between gap-2 sm:inset-x-8">
        <Link className="inline-flex min-h-[40px] items-center gap-2 rounded-lg px-2 text-sm text-muted hover:text-accent" to="/catalogo">
          <Layers3 size={17} aria-hidden="true" /> Ver catálogo
        </Link>
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-center gap-3 font-semibold tracking-tight">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-accent/30 bg-accent-soft text-accent">
            <Layers3 size={21} aria-hidden="true" />
          </span>
          <span className="truncate">{appConfig.name}</span>
        </div>
        <Card className="shadow-xl shadow-black/5">
          <h1 className="text-2xl font-semibold tracking-tight">Iniciar sesión</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">Usa tu nombre y correo para entrar en modo de prueba.</p>
          <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-sm font-medium">
              Nombre
              <input className={inputStyle} name="name" autoComplete="name" required />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Correo electrónico
              <input className={inputStyle} name="email" type="email" autoComplete="email" required />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Permisos de prueba
              <select className={inputStyle} name="role" defaultValue="editor">
                <option value="editor">Editor · Panel y configuración</option>
                <option value="lector">Lector · Solo panel</option>
              </select>
            </label>
            <Button type="submit" className="mt-2 w-full">
              Entrar <ArrowRight size={17} aria-hidden="true" />
            </Button>
          </form>
        </Card>
      </div>
    </main>
  )
}
