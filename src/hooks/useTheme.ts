import { useSyncExternalStore } from 'react'

export type Theme = 'dark' | 'light'

const key = 'app-shell:theme'
const themeEvent = 'app-shell:theme-change'

function readTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  const canvas = getComputedStyle(document.documentElement).getPropertyValue('--canvas').trim()
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', canvas)
  window.dispatchEvent(new Event(themeEvent))
}

function setTheme(theme: Theme) {
  applyTheme(theme)
  try {
    window.localStorage.setItem(key, theme)
  } catch {
    // La preferencia sigue activa durante esta visita si el navegador restringe el almacenamiento.
  }
}

function subscribe(listener: () => void) {
  function syncStorage(event: StorageEvent) {
    if (event.storageArea !== window.localStorage || (event.key !== key && event.key !== null)) return
    const stored = window.localStorage.getItem(key)
    const next = stored === 'light' ? 'light' : 'dark'
    if (readTheme() !== next) applyTheme(next)
  }

  window.addEventListener(themeEvent, listener)
  window.addEventListener('storage', syncStorage)
  return () => {
    window.removeEventListener(themeEvent, listener)
    window.removeEventListener('storage', syncStorage)
  }
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme)
  return { theme, setTheme }
}
