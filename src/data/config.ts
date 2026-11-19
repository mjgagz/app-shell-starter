export const appConfig = {
  name: import.meta.env.VITE_APP_NAME?.trim() || 'AppShell',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:3000',
}
