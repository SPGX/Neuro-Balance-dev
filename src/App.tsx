import { useLocation } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ContactSection from './components/sections/Home/ContactSection'
import ScrollToTop from './components/utils/ScrollToTop'
import useScrollToHash from './components/utils/useScrollToHash'
import './styles/fonts.css'

export default function App() {
  useScrollToHash()
  const location = useLocation()

  // hide footer
  // const hideFooterRoutes = ["/atec", "/atec/question"]

  // const shouldHideFooter = hideFooterRoutes.includes(location.pathname)

  return (
    <>
      <Navbar />
      <main>
        <ScrollToTop />
        <AppRoutes />
      </main>
      {/* {!shouldHideFooter && <ContactSection />}
      {!shouldHideFooter && <Footer />} */}
      {/* <ContactSection /> */}
      <Footer />
    </>
  )
}
