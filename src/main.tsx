import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { appConfig } from './data/config'
import './index.css'

const root = document.getElementById('root')
if (!root) throw new Error('Falta el elemento raíz de la aplicación')

document.title = appConfig.name
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
