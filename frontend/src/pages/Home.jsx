import React from 'react';
import { Link } from "react-router-dom";
import Hero from '../components/Hero/Hero.jsx';
//PlaceHolder de home
function Home() {
    return (
      <> 
          {/* Aquí se mostrará el componente Hero */}
          <Hero />
          <div>
            <h1>PlaceHolder de Home</h1>
            <p> Asi es soy un placeholder gente miren: Lore ipsum etc.</p>
            <p>No entienden la fokin vibra</p>
            <div>
              <Link to={"/AgendarIntegral"}>Agendar Plan Integral</Link>
            </div>
            <div>
              <Link to={"/AgendarMetodologo"}>Agendar Metodologo</Link>
            </div>
            <div>
              <Link to={"/AgendarPsicologo"}>Agendar Psicologo</Link>
            </div>
            <div>
              <Link to={"/TestApi"}>Testeo de la api</Link>
            </div>
          </div>
      </>
    );
}

export default Home; // Exportarla para que app.jsx la pueda ver