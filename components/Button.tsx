import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  // Updated variants for new Deep Teal & White theme
  const variants = {
    // Primary: WHITE background with STRICT BLACK text as requested
    primary: "bg-white text-black hover:bg-gray-100 shadow-lg shadow-white/10",
    
    // Secondary: Dark Teal with White text
    secondary: "bg-stream-card text-white hover:bg-teal-800",
    
    // Outline: White Border with White Text
    outline: "border-2 border-white text-white hover:bg-white hover:text-black"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};