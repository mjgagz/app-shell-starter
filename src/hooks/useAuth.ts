import { createContext, useContext } from 'react'
import type { UserSession } from '../domain/types'

interface AuthContextValue {
  user: UserSession | null
  login: (user: UserSession) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth requiere AuthProvider')
  return context
}
