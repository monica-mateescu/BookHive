import { useContext } from "react";

import { AuthContext } from "./AuthContext.tsx";

export default function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext is not available");

  return auth;
}
