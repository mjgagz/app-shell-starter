import type { HTMLAttributes } from 'react'

export function BentoGrid({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={`grid grid-cols-1 gap-4 md:grid-cols-3 ${className}`} />
}
