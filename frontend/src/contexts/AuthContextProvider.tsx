import type { ReactNode } from "react";

import { authClient } from "../utils";
import { AuthContext } from "./AuthContext.tsx";

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { data, isPending } = authClient.useSession();
  const user = data?.user
    ? { ...data.user, role: data.user.role ?? [] }
    : undefined;

  const isAdmin = user?.role?.includes("admin") ?? false;

  return (
    <AuthContext value={{ user, isAdmin, isPending }}>{children}</AuthContext>
  );
};

export default AuthContextProvider;
