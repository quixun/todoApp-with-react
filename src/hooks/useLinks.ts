import { useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";

interface LinkItem {
  path: string;
  label: string;
  requiresAuth: boolean; 
}

export const useLinks = () => {
  const { user } = useAuth(); 

  const links: LinkItem[] = useMemo(() => [
    { path: "/", label: "Login", requiresAuth: false },
    { path: "/todo", label: "ToDo", requiresAuth: true },
  ], []);

  const availableLinks = useMemo(() => {
    return links.filter(link => (link.requiresAuth ? !!user : true));
  }, [user, links]);

  return { availableLinks, isAuthenticated: !!user };
};
