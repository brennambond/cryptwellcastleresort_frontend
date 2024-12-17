"use client";

import { useRouter } from "next/navigation";
import MenuLink from "./MenuLink";
import { logout } from "../../lib/actions";

interface LogoutButtonProps {
  closeMenu?: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ closeMenu }) => {
  const router = useRouter();

  const submitLogout = () => {
    logout();
    closeMenu?.();
    router.push("/");
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
