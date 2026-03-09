import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Showcase from '@/components/Showcase';
import Services from '@/components/Services';
import Certifications from '@/components/Certifications';
import AboutUs from '@/components/AboutUs';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TrustBar />
      <Showcase />
      <Services />
      <Certifications />
      <AboutUs />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
