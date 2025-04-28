"use client";

import { useRouter } from "next/navigation";
import MenuLink from "./MenuLink";
import { logout } from "../../lib/actions";

interface LogoutButtonProps {
  onClick?: () => void;
  closeMenu: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onClick, closeMenu }) => {
  const router = useRouter();

  const submitLogout = async () => {
    try {
      if (typeof window === "undefined") return;

      await logout();
      closeMenu();

      localStorage.removeItem("user_id");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      window.dispatchEvent(new Event("storage"));

      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <MenuLink
      label='Log out'
      onClick={submitLogout}
      className='px-5 py-4 cursor-pointer hover:bg-gray-100 transition rounded-xl text-purple-main'
    />
  );
};

export default LogoutButton;
