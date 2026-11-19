import { CircleAlert, CircleCheck, FolderOpen } from 'lucide-react'
import type { ReactNode } from 'react'

const icons = { empty: FolderOpen, error: CircleAlert, success: CircleCheck }

interface FeedbackStateProps {
  kind: keyof typeof icons | 'loading'
  title: string
  description?: string
  action?: ReactNode
}

export function FeedbackState({ kind, title, description, action }: FeedbackStateProps) {
  const Icon = kind === 'loading' ? null : icons[kind]
  return (
    <div className="grid min-h-52 place-content-center justify-items-center gap-3 rounded-xl border border-dashed border-[var(--line)] bg-canvas p-5 text-center">
      {Icon && <Icon size={24} className="text-accent" aria-hidden="true" />}
      {kind === 'loading' && (
        <div aria-hidden="true" className="grid w-32 justify-items-center gap-2 motion-safe:animate-pulse">
          <div className="h-2 w-full rounded-full bg-accent/30" />
          <div className="h-2 w-2/3 rounded-full bg-accent/20" />
        </div>
      )}
      <div role={kind === 'error' ? 'alert' : 'status'}>
        <p className="font-semibold">{title}</p>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {action}
    </div>
  )
}
