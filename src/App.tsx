import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/common/ButtonAppBar";
import { AppRouter } from "./AppRouter";
import { Provider } from "react-redux";
import { store } from "./redux/store";
export const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Navbar />
        <AppRouter />
      </AuthProvider>
    </Provider>
  );
};
