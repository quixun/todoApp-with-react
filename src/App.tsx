// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // Import AuthContext
import { Login } from "./pages/Login";
import { ToDoApp } from "./pages/ToDoApp"; // Import ToDoApp component

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/todo"
        element={isAuthenticated ? <ToDoApp /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
        <AppRoutes />
    </AuthProvider>
  );
};

 
