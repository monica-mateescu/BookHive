import { authClient } from "@utils";
import { useNavigate } from "react-router";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/");
        },
      },
    });
  };

  return (
    <button className="cursor-pointer hover:underline" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
