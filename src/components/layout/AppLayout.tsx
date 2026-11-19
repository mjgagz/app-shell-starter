import { useCallback, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { navigation } from './navigation'

export function AppLayout() {
  const { user, logout } = useAuth()
  const { showToast } = useToast()
  const { key, pathname } = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuLocation, setMobileMenuLocation] = useState<string | null>(null)
  const closeMobileMenu = useCallback(() => setMobileMenuLocation(null), [])
  const mobileOpen = mobileMenuLocation === key
  const currentPath = pathname.replace(/\/+$/, '').toLowerCase() || '/'
  const title = navigation.find((item) => item.path === currentPath)?.label ?? 'Panel'

  if (mobileMenuLocation !== null && !mobileOpen) setMobileMenuLocation(null)

  function handleLogout() {
    try {
      logout()
    } catch {
      showToast('error', 'No se pudo cerrar la sesión. Intenta de nuevo.')
    }
  }

  if (!user) return null

  return (
    <div className="flex min-h-dvh">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-40 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-3">Ir al contenido</a>
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggleCollapsed={() => setCollapsed((current) => !current)}
        onCloseMobile={closeMobileMenu}
      />
      <div className="min-w-0 flex-1">
        <Topbar
          title={title}
          userName={user.name}
          mobileOpen={mobileOpen}
          onOpenMenu={() => setMobileMenuLocation(key)}
          onLogout={handleLogout}
        />
        <main id="contenido" tabIndex={-1} className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-9">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
