import {Link} from 'react-router-dom'
//PlaceHolder de agendar-psicologo
function AgendarPsicologo() {
  return (
    <div>
      <h1>PlaceHolder de agendar psicologo</h1>
      <p> Asi es soy un placeholder gente miren: Lore ipsum etc.</p>
      <p>No entienden la fokin vibra</p>

      <div>
        <Link to={"/"}>Ir al Inicio</Link>
      </div>
    </div>
  );
}

export default AgendarPsicologo; // Exportarla para que app.jsx la pueda ver
