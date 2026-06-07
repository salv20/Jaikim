"use client";

import Navbar from "./components/shared/Navbar";
import HeroSection from "./components/landing/HeroSection";
import AboutSection from "./components/landing/AboutSection";
import TrustBar from "./components/landing/TrustBar";
import ResultsDashboard from "./components/landing/ResultsDashboard";
import CaseStudiesSection from "./components/landing/CaseStudiesSection";
import GallerySection from "./components/landing/GallerySection";
import TestimonialsSection from "./components/landing/TestimonialsSection";
import ContactSection from "./components/landing/ContactSection";
import Footer from "./components/shared/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ResultsDashboard />
        <CaseStudiesSection />
        <GallerySection />
        {/* <TestimonialsSection /> */}
        <ContactSection />
      </main>
      <Footer />
    </>
    // </SmoothScroll>
  );
}
