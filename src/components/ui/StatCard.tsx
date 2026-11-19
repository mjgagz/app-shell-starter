import type { ReactNode } from 'react'
import { Card } from './Card'

interface StatCardProps {
  label: string
  value: string | number
  icon?: ReactNode
}

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <Card>
      {icon && (
        <span aria-hidden="true" className="mb-5 grid size-10 place-items-center rounded-lg border border-line bg-accent-soft text-accent">
          {icon}
        </span>
      )}
      <dl>
        <dt className="text-sm font-medium text-muted">{label}</dt>
        <dd className="mt-1 font-mono text-3xl font-semibold tracking-tight tabular-nums">{value}</dd>
      </dl>
    </Card>
  )
}
