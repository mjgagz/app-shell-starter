import type { HTMLAttributes } from 'react'

const tones = {
  neutral: 'border-[var(--line)] bg-canvas text-muted',
  success: 'border-positive/30 bg-positive/10 text-positive',
  info: 'border-accent/30 bg-accent/10 text-accent',
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: keyof typeof tones
}

export function Badge({ tone = 'neutral', className = '', ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${tones[tone]} ${className}`}
    />
  )
}
