import axios from 'axios';

//configuracion de axios para las peticiones
const apiService = axios.create({
    baseURL: 'http://localhost:8000', //URL del backend
    timeout : 1000, //Si la peticion demora mas de 1Seg esta se cancela
})
export default apiService;


//Peticiones especificas
export const getMetodologos = () => {
  return apiService.get("/api/Metodologos"); //Url donde se consultaran los metodologos
}

export const getPsicologos = () => {
  return apiService.get("/api/Psicologos"); //Url donde se consultaran los Psicologos
};