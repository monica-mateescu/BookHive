type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
};

const Button = ({
  className = "",
  variant = "primary",
  children = "More details",
  ...props
}: ButtonProps) => {
  const variantClass = {
    primary: "btn-primary btn-brand-primary",
    secondary: "btn-outline btn-brand-secondary",
  }[variant];

  return (
    <button className={`btn ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
