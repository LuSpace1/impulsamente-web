import "./ProfessionalCard.css";

const ProfessionalCard = ({ professional, onBook }) => {
  return (
    <div className="professional-card">
      <div className="professional-card__image-wrapper">
        {professional.foto_url ? (
          <img src={professional.foto_url} alt={professional.nombre_completo} />
        ) : (
          <div className="professional-card__placeholder">Sin foto</div>
        )}
      </div>
      <div className="professional-card__body">
        <h3>{professional.nombre_completo}</h3>
        <p className="professional-card__title">{professional.titulo_profesional}</p>
        {professional.especialidad && <p className="professional-card__specialty">{professional.especialidad}</p>}
        {professional.años_experiencia && (
          <p className="professional-card__experience">
            {professional.años_experiencia} años de experiencia
          </p>
        )}
        {professional.biografia && <p className="professional-card__bio">{professional.biografia}</p>}
      </div>
      <button type="button" className="professional-card__button" onClick={() => onBook(professional)}>
        Agendar con {professional.nombre_completo.split(" ")[0]}
      </button>
    </div>
  );
};

export default ProfessionalCard;
