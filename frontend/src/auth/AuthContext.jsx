import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreAuth = async () => {
      const t = localStorage.getItem("token");
      if (t) {
        try {
          // Set token first so API calls work
          setToken(t);
          // Fetch user data
          const response = await api.get("/api/auth/me");
          setUser(response.data.user);
        } catch (err) {
          // Token is invalid, remove it
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    restoreAuth();
  }, []);

  const setAuth = ({ user: u, token: t }) => {
    setUser(u);
    setToken(t);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const value = useMemo(() => ({ user, token, setAuth, logout, loading }), [user, token, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;


