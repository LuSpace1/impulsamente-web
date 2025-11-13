import { Link } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import { Element } from 'react-scroll';
import ServicesSection from "../components/ServicesSection/ServicesSection";

function Home() {
  return (
    <div>
      <Hero />

      <Element name="seccion-servicios">
        {/* aqui va el componente de servicios */}
        <ServicesSection />
      </Element>

      <Element name="seccion-nosotros">
        {/* aqui va el componente de nosotros */}
        <div
          style={{
            height: "100vh",
            background: "lightblue",
            paddingTop: "70px",
          }}
        >
          <h2>AQUÍ VA LA SECCIÓN DE NOSOTROS</h2>
        </div>
      </Element>
      <Element name="seccion-FAQ">
        {/* aqui va el componente de preguntas frecuentes*/}
        <div
          style={{
            height: "100vh",
            background: "lightgrey",
            paddingTop: "70px",
          }}
        >
          <h2>AQUÍ VA LA SECCIÓN DE FAQ</h2>
        </div>
      </Element>

      <Element name="seccion-contactanos">
        {/* aqui va el componente de contacto*/}
        <div
          style={{
            height: "100vh",
            background: "lightgreen",
            paddingTop: "70px",
          }}
        >
          <h2>AQUÍ VA LA SECCIÓN DE CONTACTO</h2>
        </div>
      </Element>
    </div>
  );
}

export default Home; 