import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  timeout: 10000,
});

apiClient.defaults.xsrfCookieName = "csrftoken";
apiClient.defaults.xsrfHeaderName = "X-CSRFToken";

export const fetchProfessionalsByService = (service) =>
  apiClient.get(`/api/professionals/${service}/`);

export const fetchProfessionalDetail = (id) =>
  apiClient.get(`/api/professionals/${id}/`);

export const getCsrfToken = () => apiClient.get("/api/accounts/csrf/");

export const adminLogin = (payload) =>
  apiClient.post("/api/accounts/login/", payload);

export const adminLogout = () => apiClient.post("/api/accounts/logout/");

export const fetchAdminSession = () => apiClient.get("/api/accounts/session/");

export const adminChangePassword = (payload) =>
  apiClient.post("/api/accounts/password/change/", payload);

export const adminListProfessionals = (params) =>
  apiClient.get("/api/accounts/professionals/", { params });

export const adminCreateProfessional = (payload) =>
  apiClient.post("/api/accounts/professionals/", payload);

export const adminUpdateProfessional = (id, payload) =>
  apiClient.put(`/api/accounts/professionals/${id}/`, payload);

export const adminDeleteProfessional = (id) =>
  apiClient.delete(`/api/accounts/professionals/${id}/`);

export const adminToggleProfessional = (id) =>
  apiClient.post(`/api/accounts/professionals/${id}/toggle_active/`);

export default apiClient;
