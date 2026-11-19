import { createContext, useContext } from 'react'
import type { ToastMessage } from '../domain/types'

interface ToastContextValue {
  toasts: ToastMessage[]
  showToast: (type: ToastMessage['type'], message: string) => void
  dismissToast: (id: ToastMessage['id']) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast requiere ToastProvider')
  return context
}
