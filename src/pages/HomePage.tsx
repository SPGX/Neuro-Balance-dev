import HeroSection from '../components/sections/Home/HeroSection'
import ServiceCards from '../components/sections/Home/ServiceCards'
import AppointmentForm from '../components/sections/Home/AppointmentForm'
import BalanceTypes from '../components/sections/Home/BalanceTypes'
import PartnerLogos from '../components/sections/Home/PartnerLogos'
import SymptomSection from '../components/sections/Home/SymptomSection'
import AboutNeuroBalance from '../components/sections/About/AboutIntro'
import NeuroFeedbackSection from '../components/sections/Home/NeuroFeedbackSection'
import ReviewSection from '../components/sections/Home/ReviewSection'
import ContactSection from '../components/sections/Home/ContactSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServiceCards />
      <AboutNeuroBalance />
      <PartnerLogos />
      <BalanceTypes />
      <NeuroFeedbackSection />
      <AppointmentForm />
      <SymptomSection />
      <ReviewSection />
    </>
  )
}
