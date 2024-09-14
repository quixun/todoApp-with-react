import React from "react";
import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Login } from "./pages/Login";
import { ToDoApp } from "./pages/ToDoApp";
import Navbar from "./components/common/ButtonAppBar";
import { useLinks } from "./hooks/useLinks";

const AppRoutes: React.FC = () => {
  const { availableLinks } = useLinks();
  const user = availableLinks.find(link => link.path === "/todo")

  return (
    <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/todo" /> : <Login />}
        />
        <Route
          path="/todo"
          element={user ? <ToDoApp /> : <Navigate to="/" />}
        />
      </Routes>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Navbar account/>
      <AppRoutes />
    </AuthProvider>
  );
};
