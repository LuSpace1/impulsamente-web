import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; //para devolver al menu
// ( Mock Data : Datos Falsos ) simula la respuesta del backend
const mockPsicologos = [
  { id: 1, nombre: "Pedrito agustin", especialidad: "Psicoterapia" },
  { id: 2, nombre: "Juana diaz", especialidad: "Psicologia Clinica" },
];

function TestApi() {
  const [psicologos, setPsicologos] = useState([]); //verifica el cambio de metodologo
  const [cargando, setCargando] = useState(true); // estado de carga de la api
  useEffect(() => {
    console.log("Componente creado. llamando a la api..");

    
    setTimeout(() => {//se simula la llamada y espera (1ms)de la api (borrar despues de completar historia IMP-3)
      console.log("datos recibidos");

      setPsicologos(mockPsicologos); //guardamos los datos falsos 

      setCargando(false);
    }, 1000); // 1 segundo de espera
  }, []); // [] indica que solo sucede al cargar la pagina

  if (cargando) { //Si cargando es true mostrara este texto primero
    return <h1>Cargando profesionales...</h1>;
  }

  return ( //Cuando cargado pase a false y useEffect vuelva a renderizar la pag, se mostrara esto
    <div>
      <h1>Test de API</h1>
      {psicologos.map((profesional)=> ( // Recorre la lista 1x1
        <li key={profesional.id}> {/* Le asigna el id del profesional a cada <li> </li> */}
            Profesional: {profesional.nombre} - Especialidad: {profesional.especialidad}
        </li>
      ))}
        <Link to={"/"}>Volver al inicio</Link>
    </div>
  );
}

export default TestApi;
