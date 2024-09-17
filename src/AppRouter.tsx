// Router.tsx
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { Login } from "./pages/Login";
import { ToDoApp } from "./pages/ToDoApp";

enum RoutePolicy {
    ForAnyone = "ForAnyone",
    ForGuests = "ForGuests",
    ForAuthenticated = "ForAuthenticated",
  }

type RouteConfig = {
  path: string;
  element: React.ReactElement;
  policy: RoutePolicy;
};

const routes: RouteConfig[] = [
  {
    path: "/",
    element: <Login />,
    policy: RoutePolicy.ForGuests,
  },
  {
    path: "/todo",
    element: <ToDoApp />,
    policy: RoutePolicy.ForAuthenticated,
  },
];
export const AppRouter = () => {
  const { user } = useAuth();  // This should now update correctly when the token is set

  const getElement = (policy: RoutePolicy, element: React.ReactElement) => {
    switch (policy) {
      case RoutePolicy.ForGuests:
        return user ? <Navigate to="/todo" replace /> : element;
      case RoutePolicy.ForAuthenticated:
        return user ? element : <Navigate to="/" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  };

  return (
    <Routes>
      {routes.map(({ path, policy, element }) => (
        <Route
          key={path}
          path={path}
          element={getElement(policy, element)}
        />
      ))}
    </Routes>
  );
};
