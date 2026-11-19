import type { HTMLAttributes } from 'react'

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={`rounded-2xl border border-[var(--line)] bg-surface p-5 sm:p-6 ${className}`} />
}
