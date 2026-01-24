import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageProvider'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </BrowserRouter>
)
