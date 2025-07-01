import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";

import HeroSection from "./components/sections/HeroSection";
import AboutNeuroBalance from "./components/AboutNeuroBalance";
import BalanceTypesSection from "./components/sections/BalanceTypesSection";
import OurServices from "./components/sections/OurServices";
import NeuroFeedbackSection from "./components/sections/NeuroFeedbackSection";
import ServiceSection from "./components/sections/ServiceSection";
import SymptomSection from "./components/sections/SymptomSection";
import PartnerLogosSection from "./components/sections/PartnerLogosSection";
import ReviewSection from "./components/sections/ReviewSection";
import ContactSection from "./components/sections/ContactSection";

/* footer */
import Footer from "./components/Footer";


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
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
