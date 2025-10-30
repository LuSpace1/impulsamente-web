import { Link } from "react-router-dom";
//PlaceHolder de agendar-psicologo
function AgendarIntegral() {
  return (
    <div>
      <h1>PlaceHolder de Agendar Integral</h1>
      <p> Asi es soy un placeholder gente miren: Lore ipsum etc.</p>
      <p>No entienden la fokin vibra</p>

      <div>
        <Link to={"/"}>Ir al Inicio</Link>
      </div>
    </div>
  );
}

export default AgendarIntegral; // Exportarla para que app.jsx la pueda ver
