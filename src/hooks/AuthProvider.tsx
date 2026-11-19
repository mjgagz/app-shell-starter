import { useEffect, useState } from 'react'
import type { PropsWithChildren } from 'react'
import type { UserSession } from '../domain/types'
import { AuthContext } from './useAuth'

const sessionKey = 'app-shell:session'

function readSession(raw: string | null): UserSession | null {
  if (raw === null) return null

  try {
    const value: unknown = JSON.parse(raw)
    if (typeof value === 'object' && value !== null &&
      'name' in value && typeof value.name === 'string' && value.name.trim() &&
      'email' in value && typeof value.email === 'string' && value.email.trim()) {
      if ('role' in value && value.role !== 'editor' && value.role !== 'lector') return null
      const role = 'role' in value && value.role === 'lector' ? 'lector' : 'editor'
      return { name: value.name, email: value.email, role }
    }
  } catch {
    return null
  }

  return null
}

function loadSession(): UserSession | null {
  try {
    return readSession(window.localStorage.getItem(sessionKey))
  } catch {
    return null
  }
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState(loadSession)

  useEffect(() => {
    function syncSession(event: StorageEvent) {
      if (event.key === sessionKey || event.key === null) setUser(loadSession())
    }

    window.addEventListener('storage', syncSession)
    return () => window.removeEventListener('storage', syncSession)
  }, [])

  function login(session: UserSession) {
    window.localStorage.setItem(sessionKey, JSON.stringify(session))
    setUser(session)
  }

  function logout() {
    window.localStorage.removeItem(sessionKey)
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
