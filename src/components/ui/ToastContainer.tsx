import { CircleAlert, CircleCheck, Info, X } from 'lucide-react'
import { useEffect } from 'react'
import type { ToastMessage } from '../../domain/types'
import { useToast } from '../../hooks/useToast'
import { Button } from './Button'

const icons = {
  success: { Icon: CircleCheck, color: 'text-positive' },
  error: { Icon: CircleAlert, color: 'text-rose-700 dark:text-rose-300' },
  info: { Icon: Info, color: 'text-accent' },
}

interface ToastProps {
  toast: ToastMessage
  dismiss: (id: string) => void
}

function Toast({ toast, dismiss }: ToastProps) {
  const { Icon, color } = icons[toast.type]
  const { id } = toast

  useEffect(() => {
    if (toast.type === 'error') return
    const timer = window.setTimeout(() => dismiss(id), 6000)
    return () => window.clearTimeout(timer)
  }, [dismiss, id, toast.type])

  return (
    <li className="pointer-events-auto flex items-center gap-3 rounded-xl border border-[var(--line)] bg-surface p-2 pl-4 shadow-xl shadow-black/20">
      <Icon size={19} className={`shrink-0 ${color}`} aria-hidden="true" />
      <p
        role={toast.type === 'error' ? 'alert' : 'status'}
        className="min-w-0 flex-1 wrap-break-word text-sm"
      >
        {toast.message}
      </p>
      <Button
        variant="ghost"
        aria-label="Cerrar notificación"
        onClick={() => dismiss(id)}
      >
        <X size={16} aria-hidden="true" />
      </Button>
    </li>
  )
}

export function ToastContainer() {
  const { toasts, dismissToast } = useToast()

  return (
    <section aria-label="Notificaciones">
      <ul className="pointer-events-none fixed inset-x-4 bottom-4 z-50 grid gap-2 sm:right-6 sm:bottom-6 sm:left-auto sm:w-96">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} dismiss={dismissToast} />
        ))}
      </ul>
    </section>
  )
}
