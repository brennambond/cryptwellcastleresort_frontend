import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  fullScreen?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "text-gray-500",
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-16 h-16 border-8",
  };

  const spinnerSize = sizeClasses[size];

  if (fullScreen) {
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'>
        <div
          className={`border-t-transparent border-solid border-4 rounded-full ${spinnerSize} ${color} animate-spin`}
        />
      </div>
    );
  }

  return (
    <div
      className={`border-t-transparent border-solid border-4 rounded-full ${spinnerSize} ${color} animate-spin`}
    />
  );
};

export default Spinner;
