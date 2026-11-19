import type { ButtonHTMLAttributes } from 'react'

const variants = {
  primary: 'bg-accent text-accent-ink hover:brightness-110',
  secondary: 'border border-[var(--line)] bg-surface text-foreground hover:bg-accent/10',
  ghost: 'text-muted hover:bg-accent/10 hover:text-foreground',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
}

export function Button({ variant = 'primary', type = 'button', className = '', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={`inline-flex min-h-[40px] min-w-[40px] cursor-pointer items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium motion-safe:transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
    />
  )
}
