import { useCallback, useRef, useState } from 'react'
import type { PropsWithChildren } from 'react'
import type { ToastMessage } from '../domain/types'
import { ToastContext } from './useToast'

export function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const nextId = useRef(0)

  function showToast(type: ToastMessage['type'], message: string) {
    const id = String(++nextId.current)
    setToasts((current) => [...current, { id, type, message }])
  }

  const dismissToast = useCallback((id: ToastMessage['id']) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  return <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>{children}</ToastContext.Provider>
}
