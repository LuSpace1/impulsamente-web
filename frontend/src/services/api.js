import axios from "axios";

// Instancia principal con credenciales (Cookies)
const apiService = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  timeout: 5000,
  withCredentials: true, // Esto envía las cookies

  // Le dice a Axios: "Busca la cookie llamada 'csrftoken' y envíala en el header 'X-CSRFToken'"
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
});

export default apiService;

// --- Funciones Públicas ---
export const getMetodologos = () => {
  return apiService.get("/api/professionals/methodology/");
};

export const getPsicologos = () => {
  return apiService.get("/api/professionals/psychology/");
};

// --- Autenticación y Admin ---
export const loginAdmin = (credentials) =>
  apiService.post("/api/auth/login/", credentials);
export const checkAuth = () => apiService.get("/api/auth/check/");
export const logoutAdmin = () => apiService.post("/api/auth/logout/");
export const changePassword = (data) =>
  apiService.post("/api/auth/change-password/", data);

// --- CRUD Profesionales ---
export const getAdminProfessionals = () =>
  apiService.get("/api/admin/professionals/");
export const createProfessional = (formData) =>
  apiService.post("/api/admin/professionals/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateProfessional = (id, formData) =>
  apiService.patch(`/api/admin/professionals/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const toggleProfessionalStatus = (id, isActive) =>
  apiService.patch(`/api/admin/professionals/${id}/`, { activo: isActive });
export const deleteProfessional = (id) =>
  apiService.delete(`/api/admin/professionals/${id}/`);
export const getProfessionalById = (id) =>
  apiService.get(`/api/admin/professionals/${id}/`);

// --- GESTIÓN DE MENSAJES (BANDEJA DE ENTRADA) ---
export const getContactMessages = () => apiService.get('/api/contact/list/');
export const deleteContactMessage = (id) => apiService.delete(`/api/contact/${id}/delete/`);
export const replyContactMessage = (id, data) => apiService.post(`/api/contact/${id}/reply/`, data);