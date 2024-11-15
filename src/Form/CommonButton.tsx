
// CommonButton.tsx
interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    text: string;
    icon?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
  }
  
  export const CommonButton: React.FC<ButtonProps> = ({
    type = 'button',
    text,
    icon,
    className = '',
    onClick,
    disabled = false,
    loading = false,
  }) => {
    const baseClassName = 'inline-flex items-center justify-center px-4 py-2 rounded-md';
    const defaultClassName = disabled 
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50';
  
    return (
      <button
        type={type}
        className={`${baseClassName} ${defaultClassName} ${className}`}
        onClick={onClick}
        disabled={disabled || loading}
      >
        {loading ? (
          <span className="animate-spin mr-2">⟳</span>
        ) : (
          icon && <span className="mr-2">{icon}</span>
        )}
        {text}
      </button>
    );
  };
  