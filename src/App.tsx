import AppRoutes from './routes/AppRoutes'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import MobileNav from './components/layout/MobileNav'
import ContactSection from './components/sections/Home/ContactSection'
import ScrollToTop from './components/utils/ScrollToTop'

export default function App() {
  return (
    <>
      <Navbar />
      <MobileNav />
      <main>
        <ScrollToTop />
        <AppRoutes />
      </main>
      <ContactSection />
      <Footer />
    </>
  )
}
