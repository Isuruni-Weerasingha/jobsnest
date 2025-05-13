import React, { ButtonHTMLAttributes } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm';
      case 'secondary':
        return 'bg-secondary-600 hover:bg-secondary-700 text-white shadow-sm';
      case 'outline':
        return 'bg-white hover:bg-gray-50 text-primary-600 border border-primary-300 hover:border-primary-400';
      case 'ghost':
        return 'bg-transparent hover:bg-gray-100 text-gray-700';
      case 'danger':
        return 'bg-error-600 hover:bg-error-700 text-white shadow-sm';
      default:
        return 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm rounded';
      case 'md':
        return 'px-4 py-2 text-sm rounded-md';
      case 'lg':
        return 'px-6 py-3 text-base rounded-md';
      default:
        return 'px-4 py-2 text-sm rounded-md';
    }
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium transition-colors duration-150 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
        disabled:opacity-60 disabled:cursor-not-allowed
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {Icon && iconPosition === 'left' && !isLoading && (
        <Icon className={`h-5 w-5 ${children ? 'mr-2' : ''}`} />
      )}
      
      {children}
      
      {Icon && iconPosition === 'right' && (
        <Icon className={`h-5 w-5 ${children ? 'ml-2' : ''}`} />
      )}
    </button>
  );
};

export default Button;