import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CrudApp } from './CrudApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CrudApp/>
  </StrictMode>,
)
