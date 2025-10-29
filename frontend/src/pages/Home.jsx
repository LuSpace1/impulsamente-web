import { Link } from "react-router-dom";
//PlaceHolder de home
function Home() {
    return (
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
    );
}

export default Home; // Exportarla para que app.jsx la pueda ver