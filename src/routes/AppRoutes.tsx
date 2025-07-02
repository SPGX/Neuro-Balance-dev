import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import ComponentsPreviewPage from '../pages/ComponentsPreviewPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/components" element={<ComponentsPreviewPage />} />
    </Routes>
  )
}
