import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import Router from './Routes/Router'
import { HelmetProvider } from 'react-helmet-async'
import AuthProvider from './Provider/AuthProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={Router}>
        </RouterProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
)
