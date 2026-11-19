export interface BaseEntity {
  id: string
}

export interface UserSession {
  role?: 'editor' | 'lector'
  name: string
  email: string
}

export interface NavItem {
  path: string
  label: string
  icon: 'dashboard' | 'settings' | 'catalog'
}

export interface ToastMessage extends BaseEntity {
  type: 'success' | 'error' | 'info'
  message: string
}
