import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { ToastContainer } from './components/ui/ToastContainer'
import { AuthProvider } from './hooks/AuthProvider'
import { ToastProvider } from './hooks/ToastProvider'
import { useAuth } from './hooks/useAuth'
import { DashboardView } from './views/DashboardView'
import { LoginView } from './views/LoginView'
import { SettingsView } from './views/SettingsView'

const CatalogView = lazy(() => import('./views/CatalogView'))

function ProtectedRoute({ editorOnly = false }: { editorOnly?: boolean }) {
  const { user } = useAuth()
  const { pathname } = useLocation()
  const from = pathname.replace(/\/+$/, '').toLowerCase() || '/'

  if (!user) return <Navigate to="/login" replace state={{ from }} />
  return editorOnly && user.role === 'lector' ? <Navigate to="/" replace /> : <Outlet />
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/catalogo/:section?" element={<Suspense fallback={<p role="status" className="p-6">Cargando biblioteca…</p>}><CatalogView /></Suspense>} />
            <Route path="/login" element={<LoginView />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route index element={<DashboardView />} />
                <Route element={<ProtectedRoute editorOnly />}>
                  <Route path="settings" element={<SettingsView />} />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ToastContainer />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
