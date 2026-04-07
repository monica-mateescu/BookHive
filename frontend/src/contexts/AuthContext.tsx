import { createContext } from "react";

type AuthContextType = {
  user: User | undefined;
  isAdmin: boolean;
  isPending: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
