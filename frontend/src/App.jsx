import './App.css'
import { Route,Routes } from 'react-router-dom'
// Importaciones de los holder de pages
import AgendarIntegral from './pages/AgendarIntegral' 
import AgendarMetodologo from './pages/AgendarMetodologo'
import AgendarPsicologo from './pages/AgendarPsicologo'
import Home from "./pages/Home";
import TestApi from './components/TestApi'

function App() {

  return (
    <>
      {/* navBar del header podria ir aqui */}
      <Routes> {/* observa y compara la url actual con las almacenadas*/}
        <Route path="/" element={<Home/>} /> {/* indica que debe renderizar [element] si coinciden */}
        <Route path="/AgendarIntegral" element={<AgendarIntegral />} />
        <Route path="/AgendarMetodologo" element={<AgendarMetodologo />} />
        <Route path="/AgendarPsicologo" element={<AgendarPsicologo />} />
        <Route path="/TestApi" element={<TestApi/>}/>
      </Routes>
      {/* Footer podria ir aqui */}
    </>
  );
}

export default App
