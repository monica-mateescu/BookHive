import type { ReactNode } from "react";

import { authClient } from "../utils";
import { AuthContext } from "./AuthContext.tsx";

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { data, isPending } = authClient.useSession();
  return (
    <AuthContext value={{ user: data?.user, isPending }}>
      {children}
    </AuthContext>
  );
};

export default AuthContextProvider;
