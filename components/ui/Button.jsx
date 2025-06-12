const Button = ({
    children,
    variant = "primary",
    className = "",
    ...props
  }) => {
    const baseStyles = "px-4 py-2 rounded font-semibold focus:outline-none";
    const variants = {
      primary:
        "bg-[var(--primary-bg)] text-[var(--primary-text)] hover:bg-opacity-80",
      secondary:
        "bg-[var(--secondary-bg)] text-[var(--secondary-text)] border border-[var(--primary-bg)] hover:bg-[var(--primary-bg)] hover:text-[var(--primary-text)]",
    };
  
    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;