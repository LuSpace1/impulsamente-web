import { useNavigate } from "react-router-dom";
import "./BackLink.css";

const BackLink = ({ to, label = "Volver" }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button type="button" className="back-link" onClick={handleClick}>
      ← {label}
    </button>
  );
};

export default BackLink;
