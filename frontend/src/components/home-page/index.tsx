"use client";

import CallToAction from "./components/cta";
import FAQs from "./components/FAQs";
import Features from "./components/features";
import Footer from "./components/footer";
import HeroSection from "./components/hero-section";
import HowItWorks from "./components/how-it-works";
import Navbar from "./components/navbar";
import Testimonials from "./components/testimonials";
import AlgorithmShowcase from "./components/algorithm-showcase";
import StatsSection from "./components/stats-section";
import Companies from "./components/companies";

const Index = () => {
  return (
    <div className="min-h-screen font-inter bg-white">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <AlgorithmShowcase />
      <Features />
      <StatsSection />
      <Testimonials />
      <FAQs />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
