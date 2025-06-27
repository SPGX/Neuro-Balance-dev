import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import HeroSection from './components/HeroSection';
import ServiceSection from './components/ServiceSection';
import PartnerLogosSection from './components/PartnerLogosSection';
import Footer from './components/Footer';
import ReviewSection from './components/ReviewSection';
import ContactSection from './components/ContactSection';
import AboutNeuroBalance from './components/AboutNeuroBalance';
import BalanceTypesSection from './components/BalanceTypesSection';
import NeuroFeedbackSection from './components/NeuroFeedbackSection';
import SymptomSection from './components/SymptomSection';
import OurServices from './components/OurServices';

import CustomerVideoSection from './components/CustomerVideoSection';

function App() {
  return (
    <div>
      <Navbar />
      <MobileNav />
      <HeroSection />
      <OurServices />
      <AboutNeuroBalance />
      <PartnerLogosSection />
      <BalanceTypesSection />
      <NeuroFeedbackSection />
      <ServiceSection />
      <SymptomSection />
      <ReviewSection />
      {/* <CustomerVideoSection /> */}
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
