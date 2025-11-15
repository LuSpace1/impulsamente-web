import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import {
  adminLogin,
  adminLogout,
  fetchAdminSession,
  getCsrfToken,
} from "../services/api";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [state, setState] = useState({
    status: "loading",
    user: null,
    mustChangePassword: false,
  });

  const loadSession = useCallback(async () => {
    try {
      const response = await fetchAdminSession();
      setState({
        status: "authenticated",
        user: { username: response.data.username },
        mustChangePassword: response.data.must_change_password,
      });
    } catch (error) {
      setState({ status: "unauthenticated", user: null, mustChangePassword: false });
    }
  }, []);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const login = useCallback(async (credentials) => {
    await getCsrfToken();
    const response = await adminLogin(credentials);
    setState({
      status: "authenticated",
      user: { username: response.data.username },
      mustChangePassword: response.data.must_change_password,
    });
    return response.data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await adminLogout();
    } finally {
      setState({ status: "unauthenticated", user: null, mustChangePassword: false });
    }
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
      refreshSession: loadSession,
      setMustChangePassword: (flag) =>
        setState((prev) => ({ ...prev, mustChangePassword: flag })),
    }),
    [state, login, logout, loadSession]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth debe usarse dentro de un AdminAuthProvider");
  }
  return context;
};
