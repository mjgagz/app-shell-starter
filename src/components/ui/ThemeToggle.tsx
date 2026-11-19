import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { Button } from './Button'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const dark = theme === 'dark'
  const Icon = dark ? Sun : Moon
  const label = dark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'

  return (
    <Button
      variant="ghost"
      className={className}
      aria-label={label}
      title={label}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
    >
      <Icon size={18} aria-hidden="true" />
    </Button>
  )
}
