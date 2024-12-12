interface CustomButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
  onSubmit?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  className,
  onSubmit,
}) => {
  return (
    <div
      onClick={onClick}
      onSubmit={onSubmit}
      className={`w-full py-4 bg-gray-800 text-white rounded-xl transition cursor-pointer text-center ${className}`}
    >
      {label}
    </div>
  );
};

export default CustomButton;
