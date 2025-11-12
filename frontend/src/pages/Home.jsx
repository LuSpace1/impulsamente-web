import { Link } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import { Element } from 'react-scroll'; 

function Home() {
    return (
      <div>

        <Hero />

        <Element name="seccion-servicios">
          {/* aqui va el componente de servicios */}
          <div
            style={{
              height: "100vh",
              background: "lightgrey",
              paddingTop: "70px",
            }}
          >
            <h2>AQUÍ VA LA SECCIÓN DE SERVICIOS</h2>
          </div>
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

        <Element name="seccion-contacto">
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