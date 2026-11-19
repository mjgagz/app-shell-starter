import { LogOut, Menu } from 'lucide-react'
import { Button } from '../ui/Button'
import { ThemeToggle } from '../ui/ThemeToggle'

interface TopbarProps {
  title: string
  userName: string
  mobileOpen: boolean
  onOpenMenu: () => void
  onLogout: () => void
}

export function Topbar({ title, userName, mobileOpen, onOpenMenu, onLogout }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-18 items-center justify-between gap-3 border-b border-line bg-canvas/95 px-4 backdrop-blur sm:px-6 lg:px-9">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <Button
          variant="ghost"
          className="-ml-2 md:hidden"
          aria-label="Abrir menú"
          aria-controls="mobile-sidebar"
          aria-expanded={mobileOpen}
          onClick={onOpenMenu}
        >
          <Menu size={21} aria-hidden="true" />
        </Button>
        <span className="text-sm font-semibold sm:text-base">{title}</span>
      </div>
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <span className="truncate text-sm text-muted" title={userName}>{userName}</span>
        <ThemeToggle />
        <Button variant="ghost" className="shrink-0" aria-label="Cerrar sesión" title="Cerrar sesión" onClick={onLogout}>
          <LogOut size={18} aria-hidden="true" />
        </Button>
      </div>
    </header>
  )
}
