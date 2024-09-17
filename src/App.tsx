import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/common/ButtonAppBar";
import { AppRouter } from "./AppRouter";
export const App = () => {
  return (
    <AuthProvider>
      <Navbar /> 
      <AppRouter />
    </AuthProvider>
  );
};
