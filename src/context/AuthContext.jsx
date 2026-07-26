import { createContext, useState, useEffect, useCallback } from "react";
import authService from "../services/authService.js";
export const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const raw = localStorage.getItem("lh-user");
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch { /* noop */ }
    }
    setLoading(false);
  }, []);
  const login = useCallback(async (email, password) => {
    const u = await authService.login(email, password);
    setUser(u);
    localStorage.setItem("lh-user", JSON.stringify(u));
    return u;
  }, []);
  const register = useCallback(async (data) => {
    const u = await authService.register(data);
    setUser(u);
    localStorage.setItem("lh-user", JSON.stringify(u));
    return u;
  }, []);
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("lh-user");
  }, []);
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
