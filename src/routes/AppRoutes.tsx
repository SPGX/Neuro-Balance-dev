import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import ComponentsPreviewPage from '../pages/ComponentsPreviewPage'
import NotFoundPage from '../pages/NotFoundPage'
import CoursesPage from '../pages/CoursesPage'
import BioBalancePage from '../pages/courses/bio-balance'
import NeuroBalancePage from '../pages/courses/neuro-balance'
import ContactUs from '../pages/ContactUs'

// import SymptomsPage from '../pages/SymptomsPage'
// import ReviewsPage from '../pages/ReviewsPage'
// import BlogPage from '../pages/BlogPage'
// import GalleryPage from '../pages/GalleryPage'
// import ContactPage from '../pages/ContactPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/components" element={<ComponentsPreviewPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/neuro-balance" element={<NeuroBalancePage />} />
      <Route path="/courses/bio-balance" element={<BioBalancePage />} />
      <Route path="/contact-us" element={<ContactUs />} />

      {/* <Route path="/symptoms" element={<SymptomsPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/contact" element={<ContactPage />} /> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
