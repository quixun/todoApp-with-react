import React, { createContext, useContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  user: { token: string } | null;
  login: (token: string) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("auth_token"));

  const login = (newToken: string) => {
    localStorage.setItem("auth_token", newToken);
    setToken(newToken);  
    navigate("/todo");
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
    navigate("/");
  };

  const user = token ? { token } : null;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
