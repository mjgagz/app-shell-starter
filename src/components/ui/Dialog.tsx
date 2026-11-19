import { useEffect, useId, useRef } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { Button } from './Button'

interface DialogProps {
  open: boolean
  onDismiss: () => void
  title: string
  placement?: 'center' | 'right'
  children: ReactNode
}

export function Dialog({ open, onDismiss, title, placement = 'center', children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog || !open) return
    dialog.showModal()
    return () => dialog.close()
  }, [open])

  const geometry = placement === 'right'
    ? 'fixed inset-y-0 right-0 left-auto my-0 mr-0 h-dvh max-h-dvh w-full max-w-md border-l motion-safe:open:animate-[drawer-enter_180ms_ease-out]'
    : 'fixed inset-0 m-auto max-h-[90dvh] w-[min(28rem,calc(100%-2rem))] rounded-2xl border'

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className={`${geometry} overflow-auto overscroll-contain border-[var(--line)] bg-surface p-6 text-foreground shadow-xl backdrop:bg-black/55`}
      onCancel={(event) => {
        event.preventDefault()
        onDismiss()
      }}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 id={titleId} className="text-xl font-semibold tracking-tight">{title}</h2>
        <Button variant="ghost" onClick={onDismiss} aria-label="Cerrar"><X size={18} aria-hidden="true" /></Button>
      </div>
      {children}
    </dialog>
  )
}
