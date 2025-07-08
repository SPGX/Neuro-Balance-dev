import AppRoutes from './routes/AppRoutes'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import MobileNav from './components/layout/MobileNav'
import ContactSection from './components/sections/Home/ContactSection'

export default function App() {
  return (
    <>
      <Navbar />
      <MobileNav />
      <main className="min-h-screen">
        <AppRoutes />
      </main>
      <ContactSection />
      <Footer />
    </>
  )
}
