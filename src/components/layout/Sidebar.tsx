import { LayoutDashboard, Layers3, Library, PanelLeftClose, PanelLeftOpen, Settings, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { appConfig } from '../../data/config'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../ui/Button'
import { navigation } from './navigation'

const icons = {
  dashboard: LayoutDashboard,
  settings: Settings,
  catalog: Library,
}

interface SidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  onToggleCollapsed: () => void
  onCloseMobile: () => void
}

interface SidebarContentProps {
  collapsed?: boolean
  brandClassName?: string
  onNavigate?: () => void
}

function SidebarContent({ collapsed = false, brandClassName = '', onNavigate }: SidebarContentProps) {
  const { user } = useAuth()
  const items = navigation.filter((item) => item.path !== '/settings' || user?.role !== 'lector')
  return (
    <>
      <div className={`flex h-18 shrink-0 items-center gap-3 pl-4 ${collapsed ? 'justify-center pr-4' : brandClassName || 'pr-4'}`}>
        <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-accent/30 bg-accent-soft text-accent">
          <Layers3 size={20} aria-hidden="true" />
        </span>
        {!collapsed && <span className="truncate text-base font-semibold tracking-tight">{appConfig.name}</span>}
      </div>
      <nav aria-label="Navegación principal" className="grid gap-1 overflow-y-auto p-3">
        {items.map(({ path, label, icon }) => {
          const Icon = icons[icon]

          return (
            <NavLink
              key={path}
              to={path}
              end
              onClick={onNavigate}
              title={collapsed ? label : undefined}
              className={({ isActive }) => {
                const spacing = collapsed ? 'justify-center' : 'gap-3 px-3'
                const tone = isActive
                  ? 'border-accent/30 bg-accent-soft text-accent'
                  : 'border-transparent text-muted hover:bg-raised hover:text-foreground'

                return `flex min-h-[40px] items-center rounded-lg border text-sm font-medium transition-colors ${spacing} ${tone}`
              }}
            >
              <Icon size={18} className="shrink-0" aria-hidden="true" />
              <span className={collapsed ? 'sr-only' : undefined}>{label}</span>
            </NavLink>
          )
        })}
      </nav>
    </>
  )
}

export function Sidebar({ collapsed, mobileOpen, onToggleCollapsed, onCloseMobile }: SidebarProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !mobileOpen) return

    const desktop = window.matchMedia('(min-width: 48rem)')
    if (desktop.matches) {
      onCloseMobile()
      return
    }

    function closeOnDesktop(event: MediaQueryListEvent) {
      if (event.matches) onCloseMobile()
    }

    dialog.showModal()
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      desktop.removeEventListener('change', closeOnDesktop)
      dialog.close()
    }
  }, [mobileOpen, onCloseMobile])

  const collapseLabel = collapsed ? 'Expandir barra lateral' : 'Contraer barra lateral'
  const CollapseIcon = collapsed ? PanelLeftOpen : PanelLeftClose

  return (
    <>
      <aside className={`sticky top-0 hidden h-dvh shrink-0 flex-col border-r border-line bg-surface md:flex ${collapsed ? 'w-18' : 'w-60'}`}>
        <SidebarContent collapsed={collapsed} />
        <div className="mt-auto border-t border-line p-3">
          <Button
            variant="ghost"
            className={`w-full ${collapsed ? '' : 'justify-start'}`}
            aria-label={collapseLabel}
            aria-expanded={!collapsed}
            title={collapseLabel}
            onClick={onToggleCollapsed}
          >
            <CollapseIcon size={18} aria-hidden="true" />
            {!collapsed && <span>Contraer</span>}
          </Button>
        </div>
      </aside>
      <dialog
        id="mobile-sidebar"
        ref={dialogRef}
        aria-label="Menú principal"
        className="fixed inset-y-0 left-0 m-0 h-dvh max-h-none w-[calc(100vw_-_3rem)] max-w-76 border-r border-line bg-surface text-foreground backdrop:bg-black/70 motion-safe:open:animate-[sidebar-enter_180ms_ease-out]"
        onCancel={(event) => {
          event.preventDefault()
          onCloseMobile()
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) onCloseMobile()
        }}
      >
        <div className="relative flex min-h-full flex-col">
          <Button variant="ghost" className="absolute top-4 right-3" onClick={onCloseMobile} aria-label="Cerrar menú">
            <X size={20} aria-hidden="true" />
          </Button>
          <SidebarContent brandClassName="pr-16" onNavigate={onCloseMobile} />
        </div>
      </dialog>
    </>
  )
}
