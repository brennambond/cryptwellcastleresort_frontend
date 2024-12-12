"use client";

interface MenuLinkProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const MenuLink: React.FC<MenuLinkProps> = ({ label, onClick, className }) => {
  return (
    <div onClick={onClick} className={`${className}`}>
      {label}
    </div>
  );
};

export default MenuLink;
