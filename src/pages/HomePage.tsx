import HeroSection from '../components/sections/Home/HeroSection'
import ServiceCards from '../components/sections/Home/ServiceCards'
import AppointmentForm from '../components/sections/Home/AppointmentForm'
import BalanceTypes from '../components/sections/Home/BalanceTypes'
import PartnerLogos from '../components/sections/Home/PartnerLogos'
import SymptomSection from '../components/sections/Home/SymptomSection'
import Testimonials from '../components/sections/Home/Testimonials'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServiceCards />
      <BalanceTypes />
      <PartnerLogos />
      <AppointmentForm />
      <SymptomSection />
      <Testimonials />
    </>
  )
}
