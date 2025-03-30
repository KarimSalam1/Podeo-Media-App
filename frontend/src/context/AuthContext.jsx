"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkAuth = async () => {
        const token = localStorage.getItem("token");

        if (token) {
          try {
            setUser({ username: localStorage.getItem("username") || "admin" });
            setIsAuthenticated(true);
          } catch (error) {
            console.error("Authentication error:", error);
            localStorage.removeItem("token");
          }
        }

        setLoading(false);
      };

      checkAuth();
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", userData.username);
    setIsAuthenticated(true);
    setUser(userData);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
