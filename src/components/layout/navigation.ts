import type { NavItem } from '../../domain/types'

export const navigation: readonly NavItem[] = [
  { path: '/', label: 'Panel', icon: 'dashboard' },
  { path: '/settings', label: 'Configuración', icon: 'settings' },
  { path: '/catalogo', label: 'Catálogo', icon: 'catalog' },
]
