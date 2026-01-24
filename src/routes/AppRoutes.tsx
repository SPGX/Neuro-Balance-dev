import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import ComponentsPreviewPage from '../pages/ComponentsPreviewPage'
import NotFoundPage from '../pages/NotFoundPage'
import CoursesPage from '../pages/CoursesPage'
import ContactUs from '../pages/ContactUs'
import ReviewsPage from '../pages/ReviewPage'
import BioBalancePage from '../pages/courses/BioBalance'
import NeuroBalancePage from '../pages/courses/NeuroBalance'
import AtecIntroPage from '../pages/AtecIntroPage'
import AtecQuestionPage from '../pages/AtecQuestionPage';
import NeurologicalSymptomPage from '../pages/NeurologicalSymptomPage'
import ArticleListPage from '../pages/ArticleListPage'
import SymptomArticlePage from '../pages/SymptomArticlePage'
import ArticlePage from '../pages/ArticlePage'

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
      <Route path="/neurological-symptom" element={<NeurologicalSymptomPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/atec" element={<AtecIntroPage />} />
      <Route path="/atec/question" element={<AtecQuestionPage />} />
      <Route path="/symptoms" element={<NeurologicalSymptomPage />} />
      <Route path="/symptom-article/:documentId" element={<SymptomArticlePage />} />
      <Route path="/article" element={<ArticleListPage />} />
      <Route path="/article/:documentId" element={<ArticlePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}