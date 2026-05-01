type ButtonProps = {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
};

const Button = ({
  onClick,
  className,
  children = "More details",
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-primary btn-brand-primary btn-sm ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
