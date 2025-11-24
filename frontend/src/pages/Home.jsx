import { Link } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import { Element } from 'react-scroll';
import ServicesSection from "../components/ServicesSection/ServicesSection";
import FAQSection from '../components/FAQSection/FAQSection';
import AboutSection from "../components/AboutSection/AboutSection.jsx";
import VideoSection from "../components/VideoSection/VideoSection.jsx";
import FloatingWhatsApp from "../components/FloatingWhatsApp/FloatingWhatsApp.jsx";


function Home() {
  return (
    <div>
      <Hero />

      <Element name="seccion-servicios">
        <ServicesSection />
      </Element>
      <Element name="seccion-nosotros">
        <AboutSection />
      </Element>
      <VideoSection />
      <Element name="seccion-FAQ">
        <FAQSection />
      </Element>
      <FloatingWhatsApp />
    </div>
  );
}

export default Home; 