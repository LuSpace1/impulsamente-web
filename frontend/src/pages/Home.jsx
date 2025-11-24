import { Link } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import { Element } from 'react-scroll';
import ServicesSection from "../components/ServicesSection/ServicesSection";
import FAQSection from '../components/FAQSection/FAQSection';
import AboutSection from "../components/AboutSection/AboutSection.jsx";

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
      <Element name="seccion-FAQ">
        <FAQSection />
      </Element>
    </div>
  );
}

export default Home; 