import type { FormEventHandler, ReactNode } from 'react'
import { Button } from './Button'
import { Dialog } from './Dialog'

interface FormDrawerProps {
  open: boolean
  title: string
  children: ReactNode
  onDismiss: () => void
  onSubmit: FormEventHandler<HTMLFormElement>
  noValidate?: boolean
}

export function FormDrawer({ open, title, children, onDismiss, onSubmit, noValidate }: FormDrawerProps) {
  return (
    <Dialog open={open} title={title} onDismiss={onDismiss} placement="right">
      <form className="grid gap-6" onSubmit={onSubmit} noValidate={noValidate}>
        {children}
        <div className="flex flex-wrap justify-end gap-2 border-t border-[var(--line)] pt-4">
          <Button variant="secondary" onClick={onDismiss}>Cancelar</Button>
          <Button type="submit">Guardar cambios</Button>
        </div>
      </form>
    </Dialog>
  )
}
