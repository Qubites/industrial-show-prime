import { lazy, Suspense } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';

const Showcase = lazy(() => import('@/components/Showcase'));
const Services = lazy(() => import('@/components/Services'));
const Certifications = lazy(() => import('@/components/Certifications'));
const References = lazy(() => import('@/components/References'));
const AboutUs = lazy(() => import('@/components/AboutUs'));
const Gallery = lazy(() => import('@/components/Gallery'));
const SocialShowcase = lazy(() => import('@/components/SocialShowcase'));
const ContactSection = lazy(() => import('@/components/ContactSection'));
const Footer = lazy(() => import('@/components/Footer'));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TrustBar />
      <Suspense fallback={<div className="h-96" />}>
        <Showcase />
        <Services />
        <Certifications />
        <References />
        <AboutUs />
        <SocialShowcase />
        <ContactSection />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
