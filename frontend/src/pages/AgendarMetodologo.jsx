import { Link } from "react-router-dom";
//PlaceHolder de agendar-psicologo
function AgendarMetodologo() {
  return (
    <div>
      <h1>PlaceHolder de Agendar Metodologo</h1>
      <p> Asi es soy un placeholder gente miren: Lore ipsum etc.</p>
      <p>No entienden la fokin vibra</p>

      <div>
        <Link to={"/"}>Ir al Inicio</Link>
      </div>
    </div>
  );
}

export default AgendarMetodologo; // Exportarla para que app.jsx la pueda ver
