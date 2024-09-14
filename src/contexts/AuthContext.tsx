import { CredentialResponse } from "@react-oauth/google";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: { token: string } | null;
  login: (tokenResponse: CredentialResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ token: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();

  const login = (tokenResponse: CredentialResponse) => {
    if (tokenResponse.credential) {
      localStorage.setItem("auth_token", tokenResponse.credential);
      setUser({ token: tokenResponse.credential });
      navigate("/todo");
    } else {
      console.error("No credential found in the token response");
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setUser({ token });
    }
    setIsLoading(false); 
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
